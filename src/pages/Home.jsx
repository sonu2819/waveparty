import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");

  const createRoom = () => {
    const id = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${id}`);
  };

  const joinRoom = () => {
    if (!roomId.trim()) return;
    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <Helmet>
        <title>WaveParty | Watch Videos Together Online</title>

        <meta
          name="description"
          content="WaveParty lets you watch YouTube videos together with friends in real-time. Enjoy synced playback, live chat, online presence, and easy room sharing."
        />

        <meta
          name="keywords"
          content="WaveParty, watch together, YouTube sync, online watch party, synced videos, live chat"
        />

        <meta name="author" content="WaveParty" />

        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="WaveParty | Watch Videos Together"
        />

        <meta
          property="og:description"
          content="Create rooms, sync videos, and watch together with friends online using WaveParty."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://waveparty.vercel.app/"
        />

        <meta
          property="og:image"
          content="https://waveparty.vercel.app/preview.png"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="WaveParty | Watch Together"
        />

        <meta
          name="twitter:description"
          content="Watch YouTube videos together online with synced playback and live chat."
        />

        <meta
          name="twitter:image"
          content="https://waveparty.vercel.app/preview.png"
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://waveparty.vercel.app/"
        />
      </Helmet>

      <div className="home-page">
        {/* background glow */}
        <div className="hero-glow"></div>

        <div className="home-card">
          <h1 className="home-logo">
            WaveParty
          </h1>

          <p className="subtitle">
            Watch YouTube videos together in real-time.
          </p>

          {/* create */}
          <button
            className="main-btn"
            onClick={createRoom}
          >
            Create Room
          </button>

          {/* divider */}
          <div className="divider">
            OR
          </div>

          {/* join */}
          <div className="join-box">
            <input
              type="text"
              placeholder="Enter room code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />

            <button onClick={joinRoom}>
              Join Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
}