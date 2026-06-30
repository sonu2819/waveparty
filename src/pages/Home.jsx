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
      <Helmet>
        <title>Watch Videos Together Online | WaveParty</title>

        <meta
          name="description"
          content="Watch YouTube videos together online in real-time. Create watch rooms, sync playback, and enjoy movies, music, and videos with friends anywhere."
        />

        <meta
          name="keywords"
          content="watch videos together online, watch youtube together, watch party online, watch movies with friends, sync video player, group video watch"
        />

        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="home-page">
        <div className="hero-glow"></div>

        {/* ================= MAIN CARD ================= */}
        <div className="home-card main-box">
          <h1 className="home-logo">Watch Together</h1>

          <p className="subtitle">
            Watch YouTube videos together online in real-time with friends anywhere in the world.
          </p>

          <button className="main-btn" onClick={createRoom}>
            Create Watch Room
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
              Join Watch Room
            </button>
          </div>
        </div>

        {/* ================= SEO CONTENT ================= */}

        <div className="seo-content-wrapper">

          <h2>Watch Videos Together Online</h2>
          <p>
            WaveParty is a free watch party platform that lets you watch YouTube videos together with friends in real-time.
            You can create a room instantly, share the link, and start watching synced videos without delay.
          </p>

          <p>
            It works perfectly for long-distance friends, couples, online communities, and study groups who want a shared viewing experience.
            Whether it's movies, music videos, tutorials, or live streams, everything plays in perfect sync.
          </p>

          <h2>How It Works</h2>
          <ul>
            <li>Create a watch room instantly in one click</li>
            <li>Share your room link with friends</li>
            <li>Watch YouTube videos together in sync</li>
            <li>Chat and interact while watching</li>
          </ul>

          <h2>Why Choose WaveParty?</h2>
          <p>
            Unlike normal video platforms, WaveParty ensures synchronized playback so everyone watches the same moment at the same time.
            No delays, no confusion, just a shared viewing experience.
          </p>

          <p>
            It is a simple and lightweight alternative to watch party apps and works directly in the browser without installation.
          </p>

          <h2>Popular Ways People Use It</h2>
          <ul>
            <li>Watch movies together online with friends</li>
            <li>Listen to music playlists in sync</li>
            <li>Group study sessions using educational videos</li>
            <li>Virtual hangouts and online watch parties</li>
          </ul>

          <h2>Watch Together Anytime, Anywhere</h2>
          <p>
            No matter where your friends are located, WaveParty makes it easy to stay connected through shared video experiences.
            Just create a room and start watching together instantly.
          </p>

        </div>
      </div>
    </>
  );
}
