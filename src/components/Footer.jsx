import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        &copy; {new Date().getFullYear()} NiceD E-commerce. All rights reserved.
      </div>
    </footer>
  );
}
