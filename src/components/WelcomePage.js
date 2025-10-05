import React, { useState } from "react";
import { motion } from "framer-motion";
import "./WelcomePage.css";

export default function WelcomePage({ onRouteSelect }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to) onRouteSelect({ from, to });
  };

  return (
    <motion.div
      className="welcome-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="subtitle">Find the safest route using real-time data</p>

      <form onSubmit={handleSubmit} className="route-form">
        <input
          type="text"
          placeholder="Enter Starting Point"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Destination"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔍 Find Safe Route
        </motion.button>
      </form>
    </motion.div>
  );
}
