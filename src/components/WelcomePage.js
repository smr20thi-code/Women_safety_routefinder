import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Women Safety Route Finder</h1>
        <p>Find the safest path to your destination — powered by real reports.</p>

        <div className="welcome-buttons">
          <button className="welcome-button" onClick={() => navigate("/map")}>
            Find Safe Route
          </button>
          <button className="welcome-button" onClick={() => navigate("/reports")}>
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
