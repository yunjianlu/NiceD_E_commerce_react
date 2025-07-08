// create conponent Login.jsx
import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth"; // Uncomment if you have an auth context

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(
    () => localStorage.getItem("niced_user_email") || ""
  );
  const navigate = useNavigate();
  // const { login } = useAuth(); // Uncomment if using auth context

  // Handles form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)
    setLoading(true); // Sets loading state to true (disables the button, shows spinner if you want)
    setError(""); // Clears any previous error messages

    try {
      // Sends a POST request to your backend login endpoint with the email and password
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Parses the JSON response from the server
      const data = await res.json();

      if (res.ok) {
        // Save user email in localStorage and state
        localStorage.setItem("niced_user_email", data.email);
        setUser(data.email);
        // login(data) // (if using an auth context)
        navigate("/"); // Redirects the user to the homepage
      } else {
        // If login fails, show the error message from the server
        setError(data.message || "Login failed");
      }
    } catch (err) {
      // If there is a network error, show a generic error message
      setError("Network error. Please try again.");
    } finally {
      setLoading(false); // Always stop loading, whether login succeeded or failed
    }
  };

  // Optionally, show a welcome message if logged in
  if (user) {
    return (
      <section className="modern-box" style={{ maxWidth: 400 }}>
        <h2 className="modern-title">Welcome, {user}!</h2>
        <p className="modern-content">You are now logged in.</p>
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
            marginTop: 16,
          }}
          onClick={() => {
            localStorage.removeItem("niced_user_email");
            setUser("");
          }}
        >
          Log out
        </button>
      </section>
    );
  }

  return (
    <section className="modern-box" style={{ maxWidth: 400 }}>
      <h2 className="modern-title">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="modern-content"
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 4,
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 4,
            }}
          />
        </label>
        {error && (
          <div style={{ color: "#d90429", marginBottom: 8 }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#2d6a4f",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.5rem 1.2rem",
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
            marginTop: 8,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
