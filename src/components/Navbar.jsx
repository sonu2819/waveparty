import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <h2 className="room-logo">Wave</h2>

        <div
          className="menu-icon"
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>
      </nav>

      {open && (
        <div className="mobile-menu">
        <a href="/">Home</a>
        <a href="/features">Features</a>
        <a href="/about">About</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact</a>
        
      
     
        </div>
      )}
    </>
  );
}