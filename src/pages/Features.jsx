import { Helmet } from "react-helmet-async";

export default function Features() {
return (
<> <Helmet> <title>WaveParty Features | Real-Time Watch Together</title>

    <meta
      name="description"
      content="Explore WaveParty features including real-time video sync, multi-user voice chat, live chat, room sharing, online presence, and mobile-friendly watch parties."
    />

    <meta
      name="keywords"
      content="WaveParty features, voice chat, watch together app, realtime sync, live chat, online watch party"
    />

    <meta name="author" content="WaveParty" />

    <meta name="robots" content="index, follow" />

    {/* Open Graph */}
    <meta
      property="og:title"
      content="WaveParty Features | Watch Together Platform"
    />

    <meta
      property="og:description"
      content="Discover WaveParty features like synced video playback, multi-user voice chat, live chat, online presence, and instant room sharing."
    />

    <meta property="og:type" content="website" />

    <meta
      property="og:url"
      content="https://waveparty.vercel.app/features"
    />

    {/* Twitter */}
    <meta
      name="twitter:card"
      content="summary_large_image"
    />

    <meta
      name="twitter:title"
      content="WaveParty Features"
    />

    <meta
      name="twitter:description"
      content="Explore the features of the WaveParty watch together platform."
    />

    {/* Canonical */}
    <link
      rel="canonical"
      href="https://waveparty.vercel.app/features"
    />
  </Helmet>

  <div className="page">
    <h1>Features</h1>

    <div className="features-grid">

      <div className="feature-card">
        <h3>⚡ Real-Time Video Sync</h3>
        <p>
          Watch videos together with perfectly synchronized playback for everyone in the room.
        </p>
      </div>

      <div className="feature-card">
        <h3>🎙️ Multi-User Voice Chat</h3>
        <p>
          Talk with friends in real time using built-in voice chat while watching videos together.
        </p>
      </div>

      <div className="feature-card">
        <h3>💬 Live Chat</h3>
        <p>
          Send messages instantly and chat alongside the video experience.
        </p>
      </div>

      <div className="feature-card">
        <h3>🟢 Online Presence</h3>
        <p>
          See who is currently active and connected in your watch room.
        </p>
      </div>

      <div className="feature-card">
        <h3>🔗 One-Click Room Sharing</h3>
        <p>
          Invite friends instantly by sharing a unique room link.
        </p>
      </div>

      <div className="feature-card">
        <h3>📱 Mobile & Desktop Support</h3>
        <p>
          Enjoy a seamless experience across phones, tablets, and computers.
        </p>
      </div>

      <div className="feature-card">
        <h3>🎬 YouTube Video Support</h3>
        <p>
          Paste YouTube links and start watching together instantly.
        </p>
      </div>

      <div className="feature-card">
        <h3>🚀 Instant Private Rooms</h3>
        <p>
          Create private watch parties in seconds without registration.
        </p>
      </div>

    </div>
  </div>
</>


);
}
