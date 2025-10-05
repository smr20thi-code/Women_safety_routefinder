import React from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

export default function MapPage({ route, onBack }) {
  const [directions, setDirections] = React.useState(null);

  const handleDirections = (response) => {
    if (response && response.status === "OK") {
      setDirections(response);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Route from {route.from} to {route.to}</h2>
      </div>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ height: "100vh", width: "100%" }}
          zoom={12}
          center={{ lat: 9.5916, lng: 76.5222 }}
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
