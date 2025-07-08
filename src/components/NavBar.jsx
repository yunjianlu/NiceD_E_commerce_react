import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [user, setUser] = useState(
    () => localStorage.getItem("niced_user_email") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes to localStorage (login/logout from other tabs or components)
    const syncUser = () =>
      setUser(localStorage.getItem("niced_user_email") || "");
    window.addEventListener("storage", syncUser);
    // Also update on focus (for same-tab logout)
    window.addEventListener("focus", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, []);

  // Also update immediately after login/logout in this tab
  useEffect(() => {
    const interval = setInterval(() => {
      const current = localStorage.getItem("niced_user_email") || "";
      setUser((prev) => (prev !== current ? current : prev));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#e6f7fa",
      }}
    >
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart</Link>
      </div>
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              background: "#2d6a4f",
              color: "#fff",
              borderRadius: 8,
              padding: "0.5rem 1.2rem",
              fontWeight: 500,
              fontSize: "1rem",
            }}
          >
            {user}
          </span>
          <button
            style={{
              background: "#d90429",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.5rem 1.2rem",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "1rem",
            }}
            onClick={() => {
              localStorage.removeItem("niced_user_email");
              setUser("");
              navigate("/login");
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          style={{
            background: "#2d6a4f",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.5rem 1.2rem",
            fontWeight: 500,
            cursor: "pointer",
            fontSize: "1rem",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      )}
    </nav>
  );
}
