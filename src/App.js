import React from "react";
import RoadList from "./components/RoadList";
import ReportList from "./components/ReportList";
import MapView from "./components/MapView";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-blue-700 text-white p-4 text-center text-2xl font-bold">
        Women Safest Route Finder
      </header>

      <main className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Road Safety Status</h2>
          <RoadList />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Incident Reports</h2>
          <ReportList />
        </div>
      </main>

      <div className="p-4">
        <MapView />
      </div>
    </div>
  );
}

export default App;
