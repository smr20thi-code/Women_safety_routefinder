import React, { useEffect, useState } from "react";
import roadsData from "../data/roads.json";
import reportsData from "../data/reports.json";
import { calculateSafetyScore } from "./utils/calculateSafetyScore";

export default function RoadSafetyStatus() {
  const [roads, setRoads] = useState([]);

  useEffect(() => {
    const withScores = roadsData.map((road) => {
      const { score, status } = calculateSafetyScore(road, reportsData);
      return { ...road, status };
    });
    setRoads(withScores);
  }, []);

  const getColor = (status) => {
    if (status === "Safe") return "bg-green-100 text-green-800 border-green-300";
    if (status === "Moderate") return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-8">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">
        Road Safety Status
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roads.map((road) => (
          <div
            key={road.id}
            className={`p-5 rounded-2xl shadow-md border ${getColor(road.status)}`}
          >
            <h2 className="text-xl font-semibold">
              {road.from} → {road.to}
            </h2>
            <p className="mt-2">
              <strong>Status:</strong> {road.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
