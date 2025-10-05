import React from "react";
import "./WelcomePage.css";

function WelcomePage({ onStart }) {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">👩‍🦰 Women Safety Route Finder</h1>
      <p>Find the safest path using real-time community data</p>

      <input type="text" placeholder="Enter Starting Point" />
      <input type="text" placeholder="Enter Destination" />

      <button onClick={onStart}>Find Safe Route</button>
    </div>
  );
}

export default WelcomePage;
