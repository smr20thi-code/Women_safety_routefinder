import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import global styles if you have them
import "./index.css";

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Disable service worker (fixes self.__WB_MANIFEST error)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
