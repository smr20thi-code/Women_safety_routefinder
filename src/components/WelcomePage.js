import React from "react";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <header>
        <h1>👩‍🦰 Women Safety Route Finder</h1>
      </header>
      <div className="welcome-content">
        <h2>Find the safest route using community data</h2>
        <input type="text" placeholder="Enter Starting Point" />
        <input type="text" placeholder="Enter Destination" />
        <button onClick={() => navigate("/map")}>Find Safe Route</button>
        <button onClick={() => navigate("/report")}>Report Unsafe Area</button>
      </div>
    </div>
  );
}
