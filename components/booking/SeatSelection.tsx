"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { useBookingStore } from "@/hooks/useBookingStore";
import { cn } from "@/lib/utils";

const ROWS = 20;
const SEATS_PER_ROW = 6;

export default function SeatSelection() {
  const { selectedSeats, toggleSeat, nextStep, previousStep } =
    useBookingStore();

  const generateSeats = () => {
    const seats = [];
    for (let row = 1; row <= ROWS; row++) {
      for (let col = 1; col <= SEATS_PER_ROW; col++) {
        const seatNumber = `${row}${String.fromCharCode(64 + col)}`;
        const isOccupied = Math.random() > 0.7; // 30% occupied
        const isSelected = selectedSeats.includes(seatNumber);

        seats.push({
          number: seatNumber,
          row,
          col,
          isOccupied,
          isSelected,
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  return (
    <GlassCard className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Select Your Seats</h2>

      {/* Legend */}
      <div className="flex gap-6 mb-8 justify-center">
        <div className="flex items-center gap-2">
          <div className="seat seat-available" />
          <span className="text-white/80 text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat seat-selected" />
          <span className="text-white/80 text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat seat-occupied" />
          <span className="text-white/80 text-sm">Occupied</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-[repeat(7,auto)] gap-2 justify-center">
        {/* Column Headers (A, B, C...) */}
        <div /> {/* Empty cell for row numbers */}
        {Array.from({ length: SEATS_PER_ROW }, (_, i) => (
          <div key={i} className="text-center text-white/60 text-sm pb-2">
            {String.fromCharCode(65 + i)}
          </div>
        ))}
        {/* Seats */}
        {Array.from({ length: ROWS }, (_, rowIndex) => (
          <>
            {/* Row Number */}
            <div
              key={`row-${rowIndex}`}
              className="text-white/60 text-sm flex items-center pr-2"
            >
              {rowIndex + 1}
            </div>

            {/* Seats in this row */}
            {seats
              .filter((seat) => seat.row === rowIndex + 1)
              .map((seat) => (
                <motion.div
                  key={seat.number}
                  className={cn(
                    "seat",
                    seat.isOccupied && "seat-occupied",
                    seat.isSelected && "seat-selected",
                    !seat.isOccupied && !seat.isSelected && "seat-available",
                  )}
                  onClick={() => !seat.isOccupied && toggleSeat(seat.number)}
                  whileHover={!seat.isOccupied ? { scale: 1.1 } : {}}
                  whileTap={!seat.isOccupied ? { scale: 0.95 } : {}}
                />
              ))}
          </>
        ))}
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <motion.div
          className="mt-8 glass-card p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/80 mb-2">Selected Seats:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat}
                className="px-3 py-1 bg-primary-500/30 rounded-lg text-white text-sm"
              >
                {seat}
              </span>
            ))}
          </div>
          <p className="text-white mt-4 text-xl font-semibold">
            Total: ${selectedSeats.length * 50}
          </p>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex gap-4 justify-center mt-8"
      >
        <Button variant="outline" onClick={previousStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={selectedSeats.length === 0}>
          Continue to Payment
        </Button>
      </motion.div>
    </GlassCard>
  );
}
