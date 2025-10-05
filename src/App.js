
import React from "react";
import Map from "./components/Map";
import Reports from "./components/Reports";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-6 space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-center text-pink-700">
          Women Safety Route Finder
        </h1>
        <p className="text-center text-gray-600">
          Find the safest path using real-time community reports
        </p>
        <Map />
        <Reports />
      </motion.div>
    </div>
  );
}

export default App;
