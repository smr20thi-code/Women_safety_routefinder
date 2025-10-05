import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import MapPage from "./components/MapPage";
import "./App.css";

function App() {
  const [route, setRoute] = useState(null);

  return (
    <div className="app-container">
      {!route ? (
        <WelcomePage onRouteSelect={setRoute} />
      ) : (
        <MapPage route={route} onBack={() => setRoute(null)} />
      )}
    </div>
  );
}

export default App;

