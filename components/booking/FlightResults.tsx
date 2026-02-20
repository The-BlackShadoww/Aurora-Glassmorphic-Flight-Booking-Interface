"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import FlightCard from "@/components/booking/FlightCard";
import { useBookingStore } from "@/hooks/useBookingStore";

// Mock flight data
const MOCK_FLIGHTS = [
  {
    id: "1",
    airline: "Aurora Airways",
    from: "NYC",
    to: "LAX",
    departure: "08:00 AM",
    arrival: "11:30 AM",
    duration: "5h 30m",
    price: 299,
    stops: 0,
  },
  {
    id: "2",
    airline: "Sky Express",
    from: "NYC",
    to: "LAX",
    departure: "02:15 PM",
    arrival: "05:45 PM",
    duration: "5h 30m",
    price: 249,
    stops: 0,
  },
  {
    id: "3",
    airline: "Global Airlines",
    from: "NYC",
    to: "LAX",
    departure: "06:00 PM",
    arrival: "09:20 PM",
    duration: "5h 20m",
    price: 279,
    stops: 0,
  },
  {
    id: "4",
    airline: "Aurora Airways",
    from: "NYC",
    to: "LAX",
    departure: "10:30 PM",
    arrival: "02:00 AM",
    duration: "5h 30m",
    price: 199,
    stops: 1,
  },
];

export default function FlightResults() {
  const { nextStep, setSelectedFlight, selectedFlight } = useBookingStore();
  const [selected, setSelected] = useState<string | null>(selectedFlight);

  const handleSelectFlight = (id: string) => {
    setSelected(id);
    setSelectedFlight(id);
  };

  const handleContinue = () => {
    if (!selected) {
      alert("Please select a flight");
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Available Flights
          </h2>
          <p className="text-white/60">Select one of the flights below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {MOCK_FLIGHTS.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleSelectFlight(flight.id)}
              className={`cursor-pointer transition-all ${
                selected === flight.id ? "ring-2 ring-emerald-500" : ""
              }`}
            >
              <FlightCard flight={flight} onSelect={handleSelectFlight} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 justify-center"
        >
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button onClick={handleContinue} disabled={!selected}>
            Continue to Passengers
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
