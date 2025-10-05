import React from "react";
import roads from "../data/roads.json";

const colorByStatus = {
  safe: "bg-green-100 border-green-500",
  moderate: "bg-yellow-100 border-yellow-500",
  unsafe: "bg-red-100 border-red-500",
};

function RoadList() {
  return (
    <div className="space-y-2">
      {roads.map((road) => (
        <div
          key={road.id}
          className={`border-l-4 p-2 rounded ${colorByStatus[road.status]}`}
        >
          <h3 className="font-semibold">{road.name}</h3>
          <p>
            Safety Score: <strong>{road.score}</strong> | Status:{" "}
            <span className="capitalize">{road.status}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default RoadList;
