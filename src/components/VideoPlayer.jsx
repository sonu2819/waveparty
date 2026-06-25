import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { db } from "../firebase";
import { ref, set, onValue } from "firebase/database";

export default function VideoPlayer({ roomId }) {
  const playerRef = useRef(null);

  const [input, setInput] = useState("");
  const [video, setVideo] = useState(null);

  // -----------------------------
  // 🔥 FIREBASE SYNC LISTENER
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

      // 🔥 Smart sync correction
      if (data.playing) {
        const elapsed = (Date.now() - data.updatedAt) / 1000;
        const targetTime = data.time + elapsed;

        const currentTime = player.getCurrentTime();

        // only correct if drift > 0.5s
        if (Math.abs(currentTime - targetTime) > 0.5) {
          player.seekTo(targetTime, "seconds");
        }
      }
    });

    return () => unsub();
  }, [roomId]);

  // -----------------------------
  // 🔥 EXTRACT YOUTUBE ID
  // -----------------------------
  const getVideoId = (url = "") => {
    try {
      if (url.includes("watch?v=")) {
        return url.split("watch?v=")[1]?.split("&")[0];
      }

      if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1]?.split("?")[0];
      }

      return "";
    } catch {
      return "";
    }
  };

  // -----------------------------
  // 🔥 LOAD VIDEO
  // -----------------------------
  const loadVideo = () => {
    const id = getVideoId(input);

    if (!id) {
      alert("Invalid YouTube URL");
      return;
    }

    set(ref(db, `rooms/${roomId}/video`), {
      videoId: id,
      playing: false,
      time: 0,
      updatedAt: Date.now(),
    });
  };

  // -----------------------------
  // 🔥 PLAY SYNC
  // -----------------------------
  const handlePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    const currentTime = player.getCurrentTime();

    set(ref(db, `rooms/${roomId}/video`), {
      ...video,
      playing: true,
      time: currentTime,
      updatedAt: Date.now(),
    });
  };

  // -----------------------------
  // 🔥 PAUSE SYNC
  // -----------------------------
  const handlePause = () => {
    const player = playerRef.current;
    if (!player) return;

    const currentTime = player.getCurrentTime();

    set(ref(db, `rooms/${roomId}/video`), {
      ...video,
      playing: false,
      time: currentTime,
      updatedAt: Date.now(),
    });
  };

  // -----------------------------
  // 🔥 PERIODIC DRIFT FIX
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;

      if (!player || !video?.playing) return;

      const elapsed = (Date.now() - video.updatedAt) / 1000;
      const expected = video.time + elapsed;

      const current = player.getCurrentTime();

      if (Math.abs(current - expected) > 1) {
        player.seekTo(expected, "seconds");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [video]);

  // -----------------------------
  // 🔥 UI
  // -----------------------------
  return (
    <div style={{ padding: 10, flex: 1 }}>
      
      {/* INPUT */}
      <input
        value={input}
         className="video-input"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste YouTube URL"
        style={{ width: "100%", padding: 10 }}
      />

    <button className="load-btn" onClick={loadVideo}>
  Load Video
</button>
      {/* PLAYER */}
      {video?.videoId ? (
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${video.videoId}`}
          playing={video.playing || false}
          controls
          width="100%"
          height="400px"
          onPlay={handlePlay}
          onPause={handlePause}
        />
      ) : (
        <div style={{ padding: 20 }}>No video loaded</div>
      )}
    </div>
  );
}