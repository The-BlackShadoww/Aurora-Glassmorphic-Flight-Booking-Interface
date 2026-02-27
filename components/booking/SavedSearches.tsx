"use client";

import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { X, ArrowRight } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";

interface Props {
  onApply: (search: any) => void;
}

export default function SavedSearches({ onApply }: Props) {
  const { savedSearches, removeSavedSearch } = useBookingStore();

  if (!savedSearches || savedSearches.length === 0) {
    return (
      <GlassCard className="p-4 text-center text-white/70">
        No saved searches
      </GlassCard>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto grid gap-3">
      {savedSearches
        .slice()
        .reverse()
        .map((s) => (
          <GlassCard
            key={s.id}
            className="p-3 flex items-center justify-between"
          >
            <div>
              <div className="text-white font-medium">
                {s.from} → {s.to}
              </div>
              <div className="text-white/60 text-sm">
                {s.departDate}
                {s.tripType === "roundtrip" && s.returnDate
                  ? ` • Return ${s.returnDate}`
                  : ""}
                {s.flexibleDates && s.flexibleDays
                  ? ` • Flexible ±${s.flexibleDays}d`
                  : ""}
                {` • ${s.passengers.adults + s.passengers.children + s.passengers.infants} pax`}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => onApply(s)}
                className="py-2 px-3"
                variant="secondary"
              >
                <ArrowRight className="w-4 h-4" />
                Apply
              </Button>
              <button
                onClick={() => removeSavedSearch(s.id)}
                className="w-9 h-9 flex items-center justify-center rounded-lg glass-card hover:bg-white/10"
                aria-label="Delete"
              >
                <X className="w-4 h-4 text-white/80" />
              </button>
            </div>
          </GlassCard>
        ))}
    </div>
  );
}
