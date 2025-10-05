export const calculateSafetyScore = (road, reports) => {
  let baseScore =
    (road.streetlights * 2 + road.cctv * 3 + road.policeProximity * 2) -
    road.crimes * 5;

  // Apply penalty for reports
  const relatedReports = reports.filter((r) => r.roadId === road.id);
  relatedReports.forEach((report) => {
    if (report.severity === "High") baseScore -= 10;
    else if (report.severity === "Medium") baseScore -= 5;
    else baseScore -= 2;
  });

  // Cap between 0–100
  const finalScore = Math.max(0, Math.min(100, baseScore));

  // Convert to status
  let status = "Safe";
  if (finalScore < 40) status = "Unsafe";
  else if (finalScore < 70) status = "Moderate";

  return { score: finalScore, status };
};
