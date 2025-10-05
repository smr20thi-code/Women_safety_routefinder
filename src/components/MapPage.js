import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { motion } from "framer-motion";
import "./MapPage.css";

export default function MapPage({ route, onBack }) {
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDirections = (response) => {
    if (response && response.status === "OK") {
      setDirections(response);
      setLoading(false);
    }
  };

  return (
    <div className="map-wrapper">
      <div className="top-bar">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h3>Route: {route.from} → {route.to}</h3>
      </div>

      {loading && (
        <motion.div
          className="loading-spinner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="spinner"></div>
          <p>Finding the safest route...</p>
        </motion.div>
      )}

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ height: "100vh", width: "100%" }}
          zoom={13}
          center={{ lat: 12.9716, lng: 77.5946 }}
        >
          <DirectionsService
            options={{
              destination: route.to,
              origin: route.from,
              travelMode: "DRIVING",
            }}
            callback={handleDirections}
          />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
