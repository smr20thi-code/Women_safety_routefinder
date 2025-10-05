import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./ReportIncident.css";

export default function ReportIncident() {
  const [desc, setDesc] = useState("");
  const [severity, setSeverity] = useState("Medium");

  const submitReport = async () => {
    if (!desc) return alert("Please describe the incident.");
    await addDoc(collection(db, "incidents"), {
      description: desc,
      severity,
      timestamp: new Date().toISOString(),
    });
    alert("✅ Report submitted successfully!");
    setDesc("");
  };

  return (
    <div className="report-container">
      <header><h1>Report an Unsafe Area</h1></header>
      <div className="form">
        <textarea
          placeholder="Describe the issue..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <button onClick={submitReport}>Submit Report</button>
      </div>
    </div>
  );
}
