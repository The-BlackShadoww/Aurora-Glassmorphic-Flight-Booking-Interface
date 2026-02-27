"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { TrendingDown, Bell, X } from "lucide-react";
import { useBookingStore } from "@/hooks/useBookingStore";

interface PriceComparisonWidgetProps {
  flights: Array<{
    id: string;
    airline: string;
    price: number;
    from: string;
    to: string;
  }>;
  fromCity: string;
  toCity: string;
}

export default function PriceComparisonWidget({
  flights,
  fromCity,
  toCity,
}: PriceComparisonWidgetProps) {
  const { addPriceAlert, priceAlerts, removePriceAlert, recordPrice } =
    useBookingStore();
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const route = `${fromCity}-${toCity}`;

  // Record prices in history
  flights.forEach((flight) => {
    recordPrice(route, flight.price);
  });

  const lowestPrice = Math.min(...flights.map((f) => f.price));
  const averagePrice =
    flights.reduce((sum, f) => sum + f.price, 0) / flights.length;
  const savingsPercent = Math.round(
    ((averagePrice - lowestPrice) / averagePrice) * 100,
  );

  const routeAlerts = priceAlerts.filter((a) => a.route === route);
  const isPriceBelowTarget =
    routeAlerts.length > 0 && lowestPrice <= routeAlerts[0].targetPrice;

  const handleSetAlert = () => {
    if (!targetPrice || isNaN(Number(targetPrice))) {
      setAlertMessage("Please enter a valid price");
      return;
    }
    addPriceAlert(route, Number(targetPrice));
    setAlertMessage(
      `Alert set! We'll notify you if prices drop below $${targetPrice}`,
    );
    setTargetPrice("");
    setTimeout(() => setShowAlertForm(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <GlassCard className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingDown className="text-emerald-400" size={24} />
              Price Comparison
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Lowest prices for {fromCity} → {toCity}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Lowest Price */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <p className="text-white/60 text-sm mb-2">Lowest Price</p>
            <p className="text-3xl font-bold text-emerald-400">
              ${lowestPrice}
            </p>
          </div>

          {/* Average Price */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <p className="text-white/60 text-sm mb-2">Average Price</p>
            <p className="text-3xl font-bold text-white">
              ${Math.round(averagePrice)}
            </p>
          </div>

          {/* Savings */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <p className="text-white/60 text-sm mb-2">Potential Savings</p>
            <p className="text-3xl font-bold text-blue-400">
              {savingsPercent}%
            </p>
          </div>
        </div>

        {/* Price Alert Section */}
        <div className="mt-6 pt-6 border-t border-white/20">
          {!showAlertForm ? (
            <Button
              onClick={() => setShowAlertForm(true)}
              className="w-full flex items-center justify-center gap-2"
              variant={routeAlerts.length > 0 ? "outline" : undefined}
            >
              <Bell size={18} />
              {routeAlerts.length > 0
                ? `${routeAlerts.length} Alert${routeAlerts.length > 1 ? "s" : ""} Set`
                : "Set Price Alert"}
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className="text-white/80 text-sm">
                Get notified when prices drop below:
              </p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Target price"
                    value={targetPrice}
                    onChange={(e) => {
                      setTargetPrice(e.target.value);
                      setAlertMessage("");
                    }}
                    className="pl-7"
                  />
                </div>
                <Button onClick={handleSetAlert}>Set</Button>
                <Button
                  onClick={() => {
                    setShowAlertForm(false);
                    setAlertMessage("");
                  }}
                  variant="outline"
                  className="px-3"
                >
                  <X size={18} />
                </Button>
              </div>
              {alertMessage && (
                <p
                  className={`text-sm ${
                    alertMessage.includes("valid")
                      ? "text-red-400"
                      : "text-emerald-400"
                  }`}
                >
                  {alertMessage}
                </p>
              )}
            </motion.div>
          )}

          {/* Show Alert Status */}
          {routeAlerts.length > 0 && (
            <div className="mt-4 space-y-2">
              {routeAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  layout
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isPriceBelowTarget
                      ? "bg-emerald-500/20 border border-emerald-400/50"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bell
                      size={16}
                      className={
                        isPriceBelowTarget
                          ? "text-emerald-400"
                          : "text-white/60"
                      }
                    />
                    <span className="text-white text-sm">
                      {isPriceBelowTarget ? (
                        <span className="text-emerald-400 font-semibold">
                          ✨ Alert! Price is ${lowestPrice} (below target $
                          {alert.targetPrice})
                        </span>
                      ) : (
                        <>Target price: ${alert.targetPrice}</>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => removePriceAlert(alert.id)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
