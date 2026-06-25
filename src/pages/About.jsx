import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About WaveParty | Watch Together Platform</title>

        <meta
          name="description"
          content="Learn about WaveParty, the real-time watch together platform where friends can sync YouTube videos, chat live, and enjoy content together online."
        />

        <meta
          name="keywords"
          content="WaveParty, watch together, sync video, online watch party, realtime streaming, YouTube watch party"
        />

        <meta name="author" content="WaveParty" />

        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About WaveParty | Watch Together Platform"
        />

        <meta
          property="og:description"
          content="Watch videos together with friends in real time using WaveParty."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://waveparty.vercel.app/about"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="About WaveParty"
        />

        <meta
          name="twitter:description"
          content="Learn more about the WaveParty watch together platform."
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://waveparty.vercel.app/about"
        />
      </Helmet>

      <div className="page">
        <h1>About WaveParty</h1>

        <p className="page-text">
          WaveParty is a real-time watch together platform that
          allows friends, families, and communities to enjoy
          YouTube videos together from anywhere in the world.
          Create a room instantly, share the room link, and
          experience synchronized video playback in real time.
        </p>

        <p className="page-text">
          Built for simplicity and speed, WaveParty includes
          live chat, online user presence, mobile-friendly
          support, instant room creation, and seamless video
          synchronization. Whether you're hosting a movie night,
          studying with friends, watching content as a community,
          or simply hanging out online, WaveParty makes shared
          viewing easy and enjoyable.
        </p>

        <p className="page-text">
          Our mission is to bring people closer through shared
          experiences. WaveParty helps users stay connected,
          interact in real time, and enjoy content together
          without complicated setup or downloads.
        </p>
      </div>
    </>
  );
}