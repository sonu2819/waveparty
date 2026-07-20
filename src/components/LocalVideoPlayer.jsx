import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { ref, set, onValue } from "firebase/database";

export default function LocalVideoPlayer({ roomId }) {
  const playerRef = useRef(null);

  const [input, setInput] = useState("");
  const [video, setVideo] = useState(null);

  // -----------------------------
  // FIREBASE SYNC
  // -----------------------------
  useEffect(() => {
    if (!roomId) return;

    const videoRef = ref(db, `rooms/${roomId}/video`);

    const unsub = onValue(videoRef, (snap) => {
      const data = snap.val();
      if (!data) return;

      setVideo(data);

      const player = playerRef.current;
      if (!player) return;

      if (data.playing) {
        const elapsed = (Date.now() - data.updatedAt) / 1000;
        const targetTime = data.time + elapsed;

        if (Math.abs(player.currentTime - targetTime) > 0.5) {
          player.currentTime = targetTime;
        }

        if (player.paused) {
          player.play().catch(() => {});
        }
      } else {
        if (!player.paused) {
          player.pause();
        }

        if (Math.abs(player.currentTime - data.time) > 0.5) {
          player.currentTime = data.time;
        }
      }
    });

    return () => unsub();
  }, [roomId]);

  // -----------------------------
  // LOAD MP4 URL
  // -----------------------------
  const loadVideo = () => {
    if (!input) {
      alert("Enter MP4 URL");
      return;
    }

    set(ref(db, `rooms/${roomId}/video`), {
      url: input,
      playing: false,
      time: 0,
      updatedAt: Date.now(),
    });
  };

  // -----------------------------
  // PLAY
  // -----------------------------
  const handlePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    set(ref(db, `rooms/${roomId}/video`), {
      ...video,
      playing: true,
      time: player.currentTime,
      updatedAt: Date.now(),
    });
  };

  // -----------------------------
  // PAUSE
  // -----------------------------
  const handlePause = () => {
    const player = playerRef.current;
    if (!player) return;

    set(ref(db, `rooms/${roomId}/video`), {
      ...video,
      playing: false,
      time: player.currentTime,
      updatedAt: Date.now(),
    });
  };

  // -----------------------------
  // SEEK
  // -----------------------------
  const handleSeeked = () => {
    const player = playerRef.current;
    if (!player) return;

    set(ref(db, `rooms/${roomId}/video`), {
      ...video,
      time: player.currentTime,
      updatedAt: Date.now(),
    });
  };

  // -----------------------------
  // DRIFT FIX
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;

      if (!player || !video?.playing) return;

      const elapsed = (Date.now() - video.updatedAt) / 1000;
      const expected = video.time + elapsed;

      if (Math.abs(player.currentTime - expected) > 1) {
        player.currentTime = expected;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [video]);

  return (
    <div style={{ padding: 10, flex: 1 }}>

      <input
        value={input}
        className="video-input"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste MP4 URL"
        style={{ width: "100%", padding: 10 }}
      />

      <button className="load-btn" onClick={loadVideo}>
        Load Video
      </button>

      {video?.url ? (
        <video
          ref={playerRef}
          src={video.url}
          controls
          width="100%"
          height="400"
          onPlay={handlePlay}
          onPause={handlePause}
          onSeeked={handleSeeked}
        />
      ) : (
        <div style={{ padding: 20 }}>
          No video loaded
        </div>
      )}
    </div>
  );
}