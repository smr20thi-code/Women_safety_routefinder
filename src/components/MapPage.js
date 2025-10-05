import React, { useEffect } from "react";
import reports from "../data/report.json";
import "./MapPage.css";

export default function MapPage() {
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: 13,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#e0e0e0" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#90a4ae" }] }
      ]
    });

    reports.forEach((r) => {
      new window.google.maps.Marker({
        position: { lat: r.lat, lng: r.lng },
        map,
        title: r.description,
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
      });
    });
  }, []);

  return (
    <div>
      <header>
        <h1>Safe Route Map</h1>
      </header>
      <div id="map" style={{ width: "100%", height: "90vh" }}></div>
    </div>
  );
}
