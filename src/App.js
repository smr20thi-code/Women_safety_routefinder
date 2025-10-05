import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import Map from "./components/Map";   // ✅ Correct import
import "./App.css";

function App() {
  const [route, setRoute] = useState(null);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`app-container ${theme}`}>
      <header className="app-header">
        <h1>🛡️ Women Safety Route Finder</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      {!route ? (
        <WelcomePage onRouteSelect={setRoute} />
      ) : (
        <Map route={route} onBack={() => setRoute(null)} />
      )}
    </div>
  );
}

export default App;
