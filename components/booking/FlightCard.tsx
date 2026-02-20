"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { Plane, Clock, Luggage, Wifi } from "lucide-react";

interface FlightCardProps {
  flight: {
    id: string;
    airline: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    price: number;
    stops: number;
  };
  onSelect: (id: string) => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative h-64 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <GlassCard className="h-full p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">{flight.airline}</p>
                <div className="flex items-center gap-4 mt-4">
                  <div>
                    <p className="text-3xl font-bold text-white">
                      {flight.from}
                    </p>
                    <p className="text-white/60 text-sm">{flight.departure}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <Plane className="w-6 h-6 text-emerald-400" />
                    <div className="w-full h-px bg-white/20 my-2" />
                    <p className="text-white/60 text-xs">{flight.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">{flight.to}</p>
                    <p className="text-white/60 text-sm">{flight.arrival}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/60 text-sm">
                  {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">from</p>
                <p className="text-3xl font-bold text-white">${flight.price}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <GlassCard className="h-full p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">
                Flight Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <Luggage className="w-5 h-5 text-emerald-400" />
                  <span>2 checked bags included</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Wifi className="w-5 h-5 text-emerald-400" />
                  <span>Free WiFi</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span>Free cancellation within 24h</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(flight.id);
              }}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
            >
              Select Flight
            </button>
          </GlassCard>
        </div>
      </motion.div>
    </motion.div>
  );
}
