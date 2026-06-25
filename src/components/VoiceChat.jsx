import { useEffect, useRef, useState, useCallback } from "react";
import { db } from "../firebase";
import { FiMic, FiMicOff } from "react-icons/fi";
import { getUserData }

from "../utils/userUtils";
import {
  ref,
  set,
  push,
  onValue,
  get,
  onChildAdded,
  onChildRemoved,
  remove,
  off,
} from "firebase/database";

const getMyId = () => {
  let id = localStorage.getItem("vibe_userId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("vibe_userId", id);
  }
  return id;
};

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

// ─── Firebase path helpers ───────────────────────────────────────────────────
// We always use the convention: smaller ID is "A", larger is "B"
// so both sides derive the same path independently.
const pairKey   = (x, y)           => x < y ? `${x}_${y}` : `${y}_${x}`;
const sigBase   = (room, x, y)     => `rooms/${room}/voice/signals/${pairKey(x, y)}`;
const offerPath = (room, x, y)     => `${sigBase(room, x, y)}/offer`;   // always written by smaller ID
const ansPath   = (room, x, y)     => `${sigBase(room, x, y)}/answer`;  // always written by larger ID
const icePath   = (room, from, to) => `${sigBase(room, from, to)}/ice_${from}`;
const peersPath = (room)           => `rooms/${room}/voice/peers`;
// ─────────────────────────────────────────────────────────────────────────────

export default function VoiceChat({ roomId }) {
  const myId = useRef(getMyId());

  const peersRef      = useRef({});   // remoteId → { pc, audioEl }
  const streamRef     = useRef(null);
  const wakeLockRef   = useRef(null);
  const cleanupFnsRef = useRef([]);
  const startedRef    = useRef(false); // guard against double-start

  const [active, setActive] = useState(false);
  const [muted,  setMuted]  = useState(false);
  const [peers,  setPeers]  = useState([]); // [{id}] for UI

  // ─── Wake Lock ─────────────────────────────────────────────────────────────
  const enableWakeLock = async () => {
    try {
      if ("wakeLock" in navigator)
        wakeLockRef.current = await navigator.wakeLock.request("screen");
    } catch (_) {}
  };

  // ─── Create one PeerConnection ─────────────────────────────────────────────
  // Role is determined purely by ID comparison — no "polite" flag passed in.
  // Smaller ID = caller (creates offer). Larger ID = callee (creates answer).
  const createPC = useCallback(async (remoteId, localStream) => {
    if (peersRef.current[remoteId]) return; // already connected

    const me = myId.current;
    const isCaller = me < remoteId; // deterministic, both sides agree

    const pc = new RTCPeerConnection(ICE_SERVERS);

    // ── Attach local tracks ──
    localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));

    // ── Remote audio ──
    const audioEl = document.createElement("audio");
    audioEl.autoplay   = true;
    audioEl.playsInline = true;
    document.body.appendChild(audioEl);

    pc.ontrack = (e) => {
      audioEl.srcObject = e.streams[0];
      audioEl.play().catch(() => {});
    };

    // ── Send our ICE candidates ──
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        push(ref(db, icePath(roomId, me, remoteId)), e.candidate.toJSON());
      }
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      console.log(`[${remoteId.slice(0,6)}] ${state}`);
      if (state === "failed") pc.restartIce();
      if (state === "disconnected") {
        // Give it 5s to recover before closing
        setTimeout(() => {
          if (pc.connectionState === "disconnected") pc.restartIce();
        }, 5000);
      }
    };

    // ── Listen for THEIR ICE candidates ──
    const theirIceRef = ref(db, icePath(roomId, remoteId, me));
    const iceCb = onChildAdded(theirIceRef, async (snap) => {
      const c = snap.val();
      try {
        // Buffer if remote description not set yet
        if (pc.remoteDescription) {
          await pc.addIceCandidate(new RTCIceCandidate(c));
        } else {
          // Retry once remote description is set (poll cheaply)
          const wait = setInterval(async () => {
            if (pc.remoteDescription) {
              clearInterval(wait);
              try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch (_) {}
            }
          }, 200);
          // Give up after 10s
          setTimeout(() => clearInterval(wait), 10000);
        }
      } catch (_) {}
    });
    cleanupFnsRef.current.push(() => off(theirIceRef, "child_added", iceCb));

    // Register early so duplicate calls in watchForPeers are blocked
    peersRef.current[remoteId] = { pc, audioEl };
    setPeers(Object.keys(peersRef.current).map((id) => ({ id })));

    // ─── Offer / Answer ──────────────────────────────────────────────────────
    if (isCaller) {
      // ── CALLER: create offer, write it, wait for answer ──
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await set(ref(db, offerPath(roomId, me, remoteId)), {
        type: offer.type,
        sdp:  offer.sdp,
      });

      const ansRef = ref(db, ansPath(roomId, me, remoteId));
      const ansCb = onValue(ansRef, async (snap) => {
        const ans = snap.val();
        if (ans && !pc.currentRemoteDescription) {
          await pc.setRemoteDescription(new RTCSessionDescription(ans));
        }
      });
      cleanupFnsRef.current.push(() => off(ansRef, "value", ansCb));

    } else {
      // ── CALLEE: wait for offer, create answer ──
      const offerRef = ref(db, offerPath(roomId, remoteId, me));
      const offerCb = onValue(offerRef, async (snap) => {
        const ofr = snap.val();
        if (!ofr || pc.currentRemoteDescription) return;
        await pc.setRemoteDescription(new RTCSessionDescription(ofr));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        await set(ref(db, ansPath(roomId, remoteId, me)), {
          type: answer.type,
          sdp:  answer.sdp,
        });
      });
      cleanupFnsRef.current.push(() => off(offerRef, "value", offerCb));
    }
  }, [roomId]);

  // ─── Watch peers list (handles both existing and new joiners) ──────────────
  // onChildAdded fires for existing children immediately, then new ones.
  // We snapshot the list BEFORE registering ourselves to know who was "existing".
  // Anyone added after we write our own entry is a new joiner — same role logic applies.
  const watchPeers = useCallback((localStream) => {
    const me     = myId.current;
    const pRef   = ref(db, peersPath(roomId));

    const addCb = onChildAdded(pRef, async (snap) => {
      const remoteId = snap.key;
      if (remoteId === me)                return;
      if (peersRef.current[remoteId])     return; // already handled
      await createPC(remoteId, localStream);
    });

    const removeCb = onChildRemoved(pRef, (snap) => {
      const remoteId = snap.key;
      const entry    = peersRef.current[remoteId];
      if (!entry) return;
      entry.pc.close();
      entry.audioEl?.remove();
      delete peersRef.current[remoteId];
      setPeers(Object.keys(peersRef.current).map((id) => ({ id })));
    });

    cleanupFnsRef.current.push(
      () => off(pRef, "child_added",   addCb),
      () => off(pRef, "child_removed", removeCb),
    );
  }, [roomId, createPC]);

  // ─── Start voice ───────────────────────────────────────────────────────────
  const startVoice = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioCtx = new AudioContext();

const analyser = audioCtx.createAnalyser();

const source =
  audioCtx.createMediaStreamSource(
    stream
  );

source.connect(analyser);

analyser.fftSize = 256;

const data = new Uint8Array(
  analyser.frequencyBinCount
);

const checkSpeaking = () => {

  analyser.getByteFrequencyData(
    data
  );

  const avg =
    data.reduce(
      (a, b) => a + b,
      0
    ) / data.length;

  const speaking = avg > 15;

  set(
    ref(
      db,
      `rooms/${roomId}/users/${myId.current}/speaking`
    ),
    speaking
  );

  requestAnimationFrame(
    checkSpeaking
  );
};

checkSpeaking();

      await enableWakeLock();

      // Start watching BEFORE we register — so onChildAdded fires for existing
      // peers before our own entry triggers their watchPeers to notice us.
      watchPeers(stream);

      // Register ourselves — this triggers onChildAdded on everyone else's listener
      const me = myId.current;
      await set(ref(db, `${peersPath(roomId)}/${me}`), { joined: Date.now() });

      window.addEventListener("beforeunload", stopVoice);
      setActive(true);
    } catch (e) {
      startedRef.current = false;
      console.error("startVoice failed:", e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, watchPeers]);

  // ─── Stop voice ────────────────────────────────────────────────────────────
  const stopVoice = useCallback(async () => {
    startedRef.current = false;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    Object.values(peersRef.current).forEach(({ pc, audioEl }) => {
      pc.close();
      audioEl?.remove();
    });
    peersRef.current = {};
    setPeers([]);

    cleanupFnsRef.current.forEach((fn) => fn());
    cleanupFnsRef.current = [];

    const me = myId.current;
    // Remove our peer entry (triggers onChildRemoved on everyone else)
    await remove(ref(db, `${peersPath(roomId)}/${me}`));
    // Clean up our signal data
    await remove(ref(db, `rooms/${roomId}/voice/signals`));

    wakeLockRef.current?.release().catch(() => {});
    wakeLockRef.current = null;

    window.removeEventListener("beforeunload", stopVoice);
    setActive(false);
    setMuted(false);
  }, [roomId]);

  // ─── Visibility change — resume audio & restart ICE ───────────────────────
  useEffect(() => {
    const handle = () => {
      if (document.hidden) return;
      Object.values(peersRef.current).forEach(({ pc, audioEl }) => {
        try { pc.restartIce(); } catch (_) {}
        audioEl?.play().catch(() => {});
      });
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  // ─── Unmount cleanup ───────────────────────────────────────────────────────
  useEffect(() => {
    return () => { if (startedRef.current) stopVoice(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Mute toggle ───────────────────────────────────────────────────────────
  const toggleMute = () => {
    const track = streamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setMuted(!track.enabled);
  };

  // ─── UI ────────────────────────────────────────────────────────────────────
  // ─── UI ────────────────────────────────────────────────────────────────────
if (!active) {
  return (
    <button onClick={startVoice} title="Start Voice">
      <FiMic />
    </button>
  );
}

return (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    
    {/* MUTE / UNMUTE */}
    <button onClick={toggleMute} title={muted ? "Unmute" : "Mute"}>
      {muted ? <FiMic /> : <FiMicOff />}
    </button>

  </div>
);
}
