import React from "react";
import reports from "../data/reports.json";

function ReportList() {
  return (
    <div className="space-y-2">
      {reports.map((r) => (
        <div
          key={r.id}
          className="p-2 border-l-4 border-blue-500 bg-white rounded shadow-sm"
        >
          <p className="font-semibold">{r.road}</p>
          <p>
            Type: {r.type} | Severity:{" "}
            <span className="capitalize font-medium text-red-600">
              {r.severity}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReportList;
