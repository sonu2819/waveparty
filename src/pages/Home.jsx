// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Helmet } from "react-helmet-async";

// export default function Home() {
//   const navigate = useNavigate();

//   const [roomId, setRoomId] = useState("");

//   const createRoom = () => {
//     const id = Math.random().toString(36).substring(2, 8);
//     navigate(`/room/${id}`);
//   };

//   const joinRoom = () => {
//     if (!roomId.trim()) return;
//     navigate(`/room/${roomId}`);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>WaveParty | Watch Videos Together Online</title>

//         <meta
//           name="description"
//           content="WaveParty lets you watch YouTube videos together with friends in real-time. Enjoy synced playback, live chat, online presence, and easy room sharing."
//         />

//         <meta
//           name="keywords"
//           content="WaveParty, watch together, YouTube sync, online watch party, synced videos, live chat"
//         />

//         <meta name="author" content="WaveParty" />

//         <meta name="robots" content="index, follow" />

//         {/* Open Graph */}
//         <meta
//           property="og:title"
//           content="WaveParty | Watch Videos Together"
//         />

//         <meta
//           property="og:description"
//           content="Create rooms, sync videos, and watch together with friends online using WaveParty."
//         />

//         <meta property="og:type" content="website" />

//         <meta
//           property="og:url"
//           content="https://waveparty.vercel.app/"
//         />

//         <meta
//           property="og:image"
//           content="https://waveparty.vercel.app/preview.png"
//         />

//         {/* Twitter */}
//         <meta
//           name="twitter:card"
//           content="summary_large_image"
//         />

//         <meta
//           name="twitter:title"
//           content="WaveParty | Watch Together"
//         />

//         <meta
//           name="twitter:description"
//           content="Watch YouTube videos together online with synced playback and live chat."
//         />

//         <meta
//           name="twitter:image"
//           content="https://waveparty.vercel.app/preview.png"
//         />

//         {/* Canonical */}
//         <link
//           rel="canonical"
//           href="https://waveparty.vercel.app/"
//         />
//       </Helmet>

//       <div className="home-page">
//         {/* background glow */}
//         <div className="hero-glow"></div>

//         <div className="home-card">
//           <h1 className="home-logo">
//             WaveParty
//           </h1>

//           <p className="subtitle">
//             Watch YouTube videos together in real-time.
//           </p>

//           {/* create */}
//           <button
//             className="main-btn"
//             onClick={createRoom}
//           >
//             Create Room
//           </button>

//           {/* divider */}
//           <div className="divider">
//             OR
//           </div>

//           {/* join */}
//           <div className="join-box">
//             <input
//               type="text"
//               placeholder="Enter room code"
//               value={roomId}
//               onChange={(e) => setRoomId(e.target.value)}
//             />

//             <button onClick={joinRoom}>
//               Join Room
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// after SEO

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
      {/* ================= ORIGINAL HELMET (UNCHANGED) ================= */}
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
        <div className="hero-glow"></div>

        {/* ================= MAIN BOX (UNCHANGED) ================= */}
        <div className="home-card">

          <h1 className="home-logo">
            WaveParty
          </h1>

          <p className="subtitle">
            Watch YouTube videos together in real-time.
          </p>

          <button className="main-btn" onClick={createRoom}>
            Create Room
          </button>

          <div className="divider">OR</div>

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

        {/* ================= SEO CONTENT (SAFE ADDITION ONLY) ================= */}
        <div className="seo-content-wrapper">

          <h2>Watch Videos Together Online</h2>
          <p>
            WaveParty is a free watch party platform where you can watch YouTube videos together with friends in real-time.
            Create a room instantly, share the link, and enjoy perfectly synchronized playback from anywhere.
          </p>

          <p>
            It is built for friends, couples, communities, and study groups who want to enjoy movies, music, and videos together online without delays.
          </p>

          <h2>How It Works</h2>
          <ul>
            <li>Create a watch room in one click</li>
            <li>Share the room link with friends</li>
            <li>Watch videos in perfect sync</li>
            <li>Chat while watching together</li>
          </ul>

          <h2>Why Choose WaveParty?</h2>
          <p>
            Unlike normal video platforms, WaveParty keeps playback synchronized so everyone watches the same moment at the same time.
          </p>

          <h2>Popular Uses</h2>
          <ul>
            <li>Watch movies together online</li>
            <li>Listen to music in sync</li>
            <li>Study with educational videos</li>
            <li>Virtual hangouts and watch parties</li>
          </ul>

        </div>

      </div>
    </>
  );
}