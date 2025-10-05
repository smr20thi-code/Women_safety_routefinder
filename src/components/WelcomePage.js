import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Women Safety Route Finder</h1>
        <p>
          Navigate safely and confidently. Choose your start and destination to
          find the safest route powered by real-time community reports.
        </p>
        <button onClick={() => navigate("/map")}>Find My Safe Route</button>
      </div>
    </div>
  );
}
