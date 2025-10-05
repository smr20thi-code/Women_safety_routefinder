import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import "./MapPage.css";

const MapPage = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const mapContainerStyle = { width: "100%", height: "100%" };
  const center = { lat: 9.9816, lng: 76.2999 };

  // 🔥 Fetch reports from Firestore
  useEffect(() => {
    const fetchReports = async () => {
      const querySnapshot = await getDocs(collection(db, "reports"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setReports(data);
    };
    fetchReports();
  }, []);

  // 🗺️ Find route
  const findRoute = () => {
    if (!origin || !destination)
      return alert("Please enter both locations.");
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") setDirections(result);
        else alert("Unable to find route.");
      }
    );
  };

  // 🎨 Severity color
  const getMarkerColor = (severity) => {
    switch (severity) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="map-page">
      <motion.div
        className="header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Women Safety Route Finder
      </motion.div>

      <div className="main-container">
        {/* 🔍 Input Section */}
        <div className="search-panel">
          <h3>Find the Safest Route</h3>
          <input
            type="text"
            placeholder="Starting point..."
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="search-input"
          />
          <button onClick={findRoute} className="find-route-btn">
            Find Route
          </button>

          {/* 🧾 Selected Report Details */}
          {selectedReport && (
            <motion.div
              className="report-details"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h4>Incident Details</h4>
              <p><strong>Type:</strong> {selectedReport.type}</p>
              <p><strong>Severity:</strong> {selectedReport.severity}</p>
              <p><strong>Location:</strong> {selectedReport.location}</p>
              <p><strong>Status:</strong> {selectedReport.status}</p>
              <p><strong>Description:</strong> {selectedReport.description}</p>
              <button
                onClick={() => setSelectedReport(null)}
                className="close-btn"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>

        {/* 🗺️ Map Section */}
        <div className="map-wrapper">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
              {directions && <DirectionsRenderer directions={directions} />}

              {reports.map((report, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: report.latitude,
                    lng: report.longitude,
                  }}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    fillColor: getMarkerColor(report.severity),
                    fillOpacity: 0.9,
                    strokeWeight: 1,
                    scale: 8,
                  }}
                  onClick={() => setSelectedReport(report)}
                />
              ))}

              {selectedReport && (
                <InfoWindow
                  position={{
                    lat: selectedReport.latitude,
                    lng: selectedReport.longitude,
                  }}
                  onCloseClick={() => setSelectedReport(null)}
                >
                  <div className="info-window">
                    <strong>{selectedReport.type}</strong>
                    <br />
                    {selectedReport.location}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
