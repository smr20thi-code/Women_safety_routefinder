import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";
import roadsData from "../data/roads.json";
import reportsData from "../data/reports.json";

const containerStyle = {
  width: "100%",
  height: "100vh"
};

const center = {
  lat: 12.9716,
  lng: 77.5946
};

function Map() {
  const [roads, setRoads] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setRoads(roadsData);
    setReports(reportsData);
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {roads.map((road, index) => (
          <Polyline
            key={index}
            path={road.path}
            options={{
              strokeColor: road.safetyScore > 7 ? "#2ecc71" : road.safetyScore > 4 ? "#f1c40f" : "#e74c3c",
              strokeWeight: 5
            }}
          />
        ))}

        {reports.map((report, index) => (
          <Marker
            key={index}
            position={{ lat: report.latitude, lng: report.longitude }}
            title={report.description}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
