import React, { useState } from "react";
import { motion } from "framer-motion";
import "./WelcomePage.css";

export default function WelcomePage({ onRouteSelect }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to) {
      onRouteSelect({ from, to });
    }
  };

  return (
    <motion.div
      className="welcome-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>🚺 Women Safety Route Finder</h1>
      <p>Find the safest path using real-time community reports</p>

      <form onSubmit={handleSubmit} className="route-form">
        <input
          type="text"
          placeholder="Starting Location"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <button type="submit">Find Safe Route</button>
      </form>
    </motion.div>
  );
}
