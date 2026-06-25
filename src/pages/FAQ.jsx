import { Helmet } from "react-helmet-async";

export default function FAQ() {
return (
<> <Helmet> <title>FAQ | WaveParty Watch Together</title>


    <meta
      name="description"
      content="Frequently asked questions about WaveParty, including video sync, multi-user voice chat, live chat, private rooms, and watch parties."
    />

    <meta
      name="keywords"
      content="WaveParty FAQ, watch together questions, voice chat, synced video help, online watch party"
    />

    <meta name="author" content="WaveParty" />

    <meta name="robots" content="index, follow" />

    {/* Open Graph */}
    <meta
      property="og:title"
      content="WaveParty FAQ | Watch Together Platform"
    />

    <meta
      property="og:description"
      content="Answers to common questions about WaveParty, video synchronization, voice chat, and watch parties."
    />

    <meta property="og:type" content="website" />

    <meta
      property="og:url"
      content="https://waveparty.vercel.app/faq"
    />

    {/* Twitter */}
    <meta
      name="twitter:card"
      content="summary_large_image"
    />

    <meta
      name="twitter:title"
      content="WaveParty FAQ"
    />

    <meta
      name="twitter:description"
      content="Frequently asked questions about the WaveParty platform."
    />

    {/* Canonical */}
    <link
      rel="canonical"
      href="https://waveparty.vercel.app/faq"
    />
  </Helmet>

  <div className="page">
    <h1>Frequently Asked Questions</h1>

    <div className="faq-section">

      <div className="faq-item">
        <h3>🎬 What is WaveParty?</h3>
        <p>
          WaveParty is a real-time watch together platform that lets users
          watch YouTube videos in sync, chat live, and talk through voice chat.
        </p>
      </div>

      <div className="faq-item">
        <h3>🎙️ Does WaveParty support voice chat?</h3>
        <p>
          Yes. Multiple users can join the same room and communicate using
          real-time voice chat while watching together.
        </p>
      </div>

      <div className="faq-item">
        <h3>💬 Does WaveParty include live chat?</h3>
        <p>
          Yes. Users can send messages and chat together while watching videos.
        </p>
      </div>

      <div className="faq-item">
        <h3>📱 Does it work on mobile?</h3>
        <p>
          Yes. WaveParty works on both mobile devices and desktop browsers.
        </p>
      </div>

      <div className="faq-item">
        <h3>🔒 Are rooms private?</h3>
        <p>
          Rooms are accessible only through the room link or room code shared
          by participants.
        </p>
      </div>

      <div className="faq-item">
        <h3>⚡ Is signup required?</h3>
        <p>
          No. You can create or join rooms instantly without creating an account.
        </p>
      </div>

      <div className="faq-item">
        <h3>👥 How many people can join a room?</h3>
        <p>
          Multiple participants can join the same room and enjoy synchronized
          video playback, voice chat, and messaging together.
        </p>
      </div>

      <div className="faq-item">
        <h3>🎥 What videos can I watch?</h3>
        <p>
          You can watch supported YouTube videos together with synchronized
          playback across all participants.
        </p>
      </div>

    </div>
  </div>
</>


);
}
