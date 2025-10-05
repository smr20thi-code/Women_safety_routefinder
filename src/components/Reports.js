import React, { useState, useEffect } from "react";
import reportsData from "../data/reports.json";

const severityColors = {
  low: "#5cb85c",
  medium: "#f0ad4e",
  high: "#d9534f",
};

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(reportsData);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Incident Reports</h2>
      <div style={styles.grid}>
        {reports.map((report) => (
          <div key={report.id} style={{ ...styles.card, borderLeft: `6px solid ${severityColors[report.severity]}` }}>
            <h3 style={styles.title}>{report.type}</h3>
            <p><b>Location:</b> {report.location}</p>
            <p><b>Road ID:</b> {report.roadId}</p>
            <p><b>Description:</b> {report.description}</p>
            <p><b>Severity:</b> <span style={{ color: severityColors[report.severity], fontWeight: "bold" }}>{report.severity}</span></p>
            <p><b>Status:</b> <span style={{ textTransform: "capitalize" }}>{report.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "25px",
    fontSize: "2em",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px 20px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  title: {
    marginBottom: "10px",
    color: "#007bff",
  },
};

export default Reports;
