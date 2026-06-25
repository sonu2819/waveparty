import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-links">

        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
        


      </div>

      <span>© 2026 WaveParty</span>

    </footer>
  );
}