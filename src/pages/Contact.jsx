import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact WaveParty | Watch Together Support</title>

        <meta
          name="description"
          content="Contact WaveParty for support, feedback, bug reports, feature requests, or business inquiries."
        />

        <meta
          name="keywords"
          content="WaveParty contact, watch together support, online watch party help, WaveParty support"
        />

        <meta name="author" content="WaveParty" />

        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Contact WaveParty | Watch Together Platform"
        />

        <meta
          property="og:description"
          content="Get in touch with WaveParty for support, feedback, and inquiries."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://waveparty.vercel.app/contact"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Contact WaveParty"
        />

        <meta
          name="twitter:description"
          content="Contact the WaveParty team for support and feedback."
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://waveparty.vercel.app/contact"
        />
      </Helmet>

      <div className="page">
        <h1>Contact WaveParty</h1>

        <p className="page-text">
          Have questions, feedback, bug reports, or suggestions
          for WaveParty? Feel free to contact us anytime.
          <br />
          <br />
          📧 Email: <strong>merestro106@gmail.com</strong>
        </p>
      </div>
    </>
  );
}