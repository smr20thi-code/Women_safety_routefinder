import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 9.9312, // Kochi
  lng: 76.2673,
};

function MapView() {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        {/* Later you can add Markers for each road */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;
