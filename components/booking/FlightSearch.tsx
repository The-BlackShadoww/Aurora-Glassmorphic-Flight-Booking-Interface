"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import {
  Plane,
  Calendar,
  Users,
  Search,
  ArrowRightLeft,
  MapPin,
  ChevronDown,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";
import SavedSearches from "@/components/booking/SavedSearches";

// Mock city data
const CITIES = [
  { code: "NYC", name: "New York", country: "United States" },
  { code: "LAX", name: "Los Angeles", country: "United States" },
  { code: "LON", name: "London", country: "United Kingdom" },
  { code: "PAR", name: "Paris", country: "France" },
  { code: "TYO", name: "Tokyo", country: "Japan" },
  { code: "DXB", name: "Dubai", country: "UAE" },
  { code: "SIN", name: "Singapore", country: "Singapore" },
  { code: "SYD", name: "Sydney", country: "Australia" },
  { code: "BKK", name: "Bangkok", country: "Thailand" },
  { code: "IST", name: "Istanbul", country: "Turkey" },
];

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

export default function FlightSearch() {
  const { nextStep, addSavedSearch, loadSavedSearches } = useBookingStore();

  // Form state
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [flightClass, setFlightClass] = useState<
    "economy" | "business" | "first"
  >("economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  // Dropdown states
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  // Filtered cities for autocomplete
  const filteredFromCities = CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(from.toLowerCase()) ||
      city.code.toLowerCase().includes(from.toLowerCase()),
  );

  const filteredToCities = CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(to.toLowerCase()) ||
      city.code.toLowerCase().includes(to.toLowerCase()),
  );

  // Swap cities
  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // Update passenger count
  const updatePassengers = (type: keyof PassengerCount, increment: boolean) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: increment
        ? Math.min(prev[type] + 1, type === "adults" ? 9 : 5)
        : Math.max(prev[type] - 1, type === "adults" ? 1 : 0),
    }));
  };

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  // Handle search
  const handleSearch = () => {
    // Validation
    if (!from || !to || !departDate) {
      alert("Please fill in all required fields");
      return;
    }

    // Proceed to next step (flight results)
    nextStep();
  };

  // Load any saved searches from localStorage on mount
  useEffect(() => {
    try {
      loadSavedSearches();
    } catch (e) {
      // ignore
    }
  }, [loadSavedSearches]);

  const handleSave = () => {
    if (!from || !to || !departDate) {
      alert("Please fill required fields before saving");
      return;
    }

    addSavedSearch({
      tripType,
      flightClass,
      from,
      to,
      departDate,
      returnDate: tripType === "roundtrip" ? returnDate : undefined,
      passengers,
    });

    alert("Search saved");
  };

  const applySavedSearch = (s: any) => {
    setTripType(s.tripType || "roundtrip");
    setFlightClass(s.flightClass || "economy");
    setFrom(s.from || "");
    setTo(s.to || "");
    setDepartDate(s.departDate || "");
    setReturnDate(s.returnDate || "");
    setPassengers(s.passengers || { adults: 1, children: 0, infants: 0 });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Trip Type Selector */}
      <motion.div
        className="flex gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setTripType("roundtrip")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            tripType === "roundtrip"
              ? "glass-card text-slate-900"
              : "text-slate-900/60 hover:text-slate-900"
          }`}
        >
          Round Trip
        </button>
        <button
          onClick={() => setTripType("oneway")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            tripType === "oneway"
              ? "glass-card text-slate-900"
              : "text-slate-900/60 hover:text-slate-900"
          }`}
        >
          One Way
        </button>
      </motion.div>

      {/* Main Search Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* From City */}
            <div className="relative">
              <label className="block text-slate-900/80 text-sm mb-2 font-medium">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-900/40" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setShowFromDropdown(true);
                  }}
                  onFocus={() => setShowFromDropdown(true)}
                  placeholder="City or Airport"
                  className="w-full glass-card pl-12 pr-4 py-3 text-white placeholder-white/40 rounded-xl transition-all duration-300 focus:border-primary-500/60 focus:bg-white/15 input-glow"
                />

                {/* Autocomplete Dropdown */}
                <AnimatePresence>
                  {showFromDropdown &&
                    from &&
                    filteredFromCities.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 glass-card rounded-xl overflow-hidden"
                      >
                        {filteredFromCities.map((city) => (
                          <button
                            key={city.code}
                            onClick={() => {
                              setFrom(`${city.name} (${city.code})`);
                              setShowFromDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium">
                                  {city.name}
                                </p>
                                <p className="text-white/60 text-sm">
                                  {city.country}
                                </p>
                              </div>
                              <span className="text-slate-900/80 font-mono">
                                {city.code}
                              </span>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </div>

            {/* Swap Button */}
            <div className="hidden lg:flex items-end justify-center pb-3 relative z-[100]">
              <motion.button
                onClick={swapCities}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:bg-white/20 transition-all relative z-[100]"
              >
                <ArrowRightLeft className="w-5 h-5 text-slate-900" />
              </motion.button>
            </div>

            {/* To City */}
            <div className="relative">
              <label className="block text-slate-900/80 text-sm mb-2 font-medium">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-900/40" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setShowToDropdown(true);
                  }}
                  onFocus={() => setShowToDropdown(true)}
                  placeholder="City or Airport"
                  className="w-full glass-card pl-12 pr-4 py-3 text-slate-900 placeholder-slate-400 rounded-xl transition-all duration-300 focus:border-primary-500/60 focus:bg-slate-100 input-glow"
                />

                {/* Autocomplete Dropdown */}
                <AnimatePresence>
                  {showToDropdown && to && filteredToCities.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 glass-card rounded-xl overflow-hidden"
                    >
                      {filteredToCities.map((city) => (
                        <button
                          key={city.code}
                          onClick={() => {
                            setTo(`${city.name} (${city.code})`);
                            setShowToDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium">
                                {city.name}
                              </p>
                              <p className="text-white/60 text-sm">
                                {city.country}
                              </p>
                            </div>
                            <span className="text-white/80 font-mono">
                              {city.code}
                            </span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Depart Date */}
            <div>
              <label className="block text-slate-900/80 text-sm mb-2 font-medium">
                Depart
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-900/40" />
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full glass-card pl-12 pr-4 py-3 text-slate-900 rounded-xl transition-all duration-300 focus:border-primary-500/60 focus:bg-slate-100 input-glow"
                />
              </div>
            </div>

            {/* Return Date */}
            {tripType === "roundtrip" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <label className="block text-slate-900/80 text-sm mb-2 font-medium">
                  Return
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-900/40" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departDate || new Date().toISOString().split("T")[0]}
                    className="w-full glass-card pl-12 pr-4 py-3 text-slate-900 rounded-xl transition-all duration-300 focus:border-primary-500/60 focus:bg-slate-100 input-glow"
                  />
                </div>
              </motion.div>
            )}

            {/* Passengers */}
            <div className="relative">
              <label className="block text-slate-900/80 text-sm mb-2 font-medium">
                Passengers
              </label>
              <button
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                className="w-full glass-card px-4 py-3 text-slate-900 rounded-xl transition-all duration-300 hover:bg-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-900/40" />
                  <span>
                    {totalPassengers} Passenger{totalPassengers > 1 ? "s" : ""}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-900/40 transition-transform ${showPassengerDropdown ? "rotate-180" : ""}`}
                  n
                />
              </button>

              {/* Passenger Dropdown */}
              <AnimatePresence>
                {showPassengerDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 glass-card rounded-xl p-4 space-y-4"
                  >
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-900 font-medium">Adults</p>
                        <p className="text-slate-900/60 text-sm">12+ years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updatePassengers("adults", false)}
                          disabled={passengers.adults <= 1}
                          className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Minus className="w-4 h-4 text-slate-900" />
                        </button>
                        <span className="text-slate-900 font-semibold w-8 text-center">
                          {passengers.adults}
                        </span>
                        <button
                          onClick={() => updatePassengers("adults", true)}
                          disabled={passengers.adults >= 9}
                          className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Plus className="w-4 h-4 text-slate-900" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-900 font-medium">Children</p>
                        <p className="text-slate-900/60 text-sm">2-11 years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updatePassengers("children", false)}
                          disabled={passengers.children <= 0}
                          className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Minus className="w-4 h-4 text-slate-900" />
                        </button>
                        <span className="text-slate-900 font-semibold w-8 text-center">
                          {passengers.children}
                        </span>
                        <button
                          onClick={() => updatePassengers("children", true)}
                          disabled={passengers.children >= 5}
                          className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Plus className="w-4 h-4 text-slate-900" />
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-900 font-medium">Infants</p>
                        <p className="text-slate-900/60 text-sm">
                          Under 2 years
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updatePassengers("infants", false)}
                          disabled={passengers.infants <= 0}
                          className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Minus className="w-4 h-4 text-slate-900" />
                        </button>
                        <span className="text-slate-900 font-semibold w-8 text-center">
                          {passengers.infants}
                        </span>
                        <button
                          onClick={() => updatePassengers("infants", true)}
                          disabled={passengers.infants >= 5}
                          className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Plus className="w-4 h-4 text-slate-900" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowPassengerDropdown(false)}
                      className="w-full py-2 bg-primary-500/30 hover:bg-primary-500/40 text-slate-900 rounded-lg transition-all"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Class */}
            <div className="relative">
              <label className="block text-slate-900/80 text-sm mb-2 font-medium">
                Class
              </label>
              <button
                onClick={() => setShowClassDropdown(!showClassDropdown)}
                className="w-full glass-card px-4 py-3 text-slate-900 rounded-xl transition-all duration-300 hover:bg-slate-100 flex items-center justify-between"
              >
                <span className="capitalize">{flightClass}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-900/40 transition-transform ${showClassDropdown ? "rotate-180" : ""}`}
                  n
                />
              </button>

              {/* Class Dropdown */}
              <AnimatePresence>
                {showClassDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 glass-card rounded-xl overflow-hidden"
                  >
                    {["economy", "business", "first"].map((classType) => (
                      <button
                        key={classType}
                        onClick={() => {
                          setFlightClass(classType as any);
                          setShowClassDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors capitalize ${
                          flightClass === classType
                            ? "bg-slate-100 text-primary-500"
                            : "text-slate-900"
                        }`}
                      >
                        {classType}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSearch}
              className="w-full py-4 text-lg flex items-center justify-center gap-3"
            >
              <Search className="w-5 h-5" />
              Search Flights
            </Button>
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Additional Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 flex flex-wrap gap-4 justify-center"
      >
        <button className="glass-card px-6 py-3 rounded-xl text-slate-900/80 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-2">
          <Plane className="w-4 h-4" />
          Explore Destinations
        </button>
        <button className="glass-card px-6 py-3 rounded-xl text-slate-900/80 hover:text-slate-900 hover:bg-slate-100 transition-all">
          Flexible Dates
        </button>
        <button className="glass-card px-6 py-3 rounded-xl text-slate-900/80 hover:text-slate-900 hover:bg-slate-100 transition-all">
          Track Prices
        </button>
        <button
          onClick={handleSave}
          className="glass-card px-6 py-3 rounded-xl text-slate-900/80 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          Save Search
        </button>
      </motion.div>

      {/* Saved Searches List */}
      <div className="mt-6">
        <SavedSearches onApply={applySavedSearch} />
      </div>
    </div>
  );
}
