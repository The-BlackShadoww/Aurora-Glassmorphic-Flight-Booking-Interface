"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useBookingStore } from "@/hooks/useBookingStore";
import { CreditCard, Lock, Calendar } from "lucide-react";
import { useState } from "react";

export default function PaymentStep() {
  const { previousStep } = useBookingStore();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardChange = (field: keyof typeof cardDetails, value: string) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePayment = async () => {
    // Validate
    if (
      !cardDetails.cardNumber ||
      !cardDetails.cardHolder ||
      !cardDetails.expiryMonth ||
      !cardDetails.expiryYear ||
      !cardDetails.cvv
    ) {
      alert("Please fill in all card details");
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);

    alert("Payment successful! Your booking is confirmed.");
    // Reset or redirect
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Payment</h2>
          <p className="text-white/60">
            Complete your booking by providing payment details
          </p>
        </div>

        {/* Price Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Booking Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-white/80">
                <span>Flight Ticket</span>
                <span>$299.00</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Seat Selection (2 seats)</span>
                <span>$100.00</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Service Fee</span>
                <span>$25.00</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-white font-semibold text-lg">
                <span>Total</span>
                <span>$424.00</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Payment Method Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard className="p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl transition-all border-2 flex items-center gap-3 ${
                  paymentMethod === "card"
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <CreditCard className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("wallet")}
                className={`p-4 rounded-xl transition-all border-2 flex items-center gap-3 ${
                  paymentMethod === "wallet"
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Lock className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Digital Wallet</span>
              </button>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === "card" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) =>
                    handleCardChange(
                      "cardNumber",
                      e.target.value.replace(/\D/g, "").slice(0, 16),
                    )
                  }
                />
                <Input
                  label="Cardholder Name"
                  placeholder="John Doe"
                  value={cardDetails.cardHolder}
                  onChange={(e) =>
                    handleCardChange("cardHolder", e.target.value)
                  }
                />
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="Month"
                    placeholder="MM"
                    value={cardDetails.expiryMonth}
                    onChange={(e) =>
                      handleCardChange(
                        "expiryMonth",
                        e.target.value.replace(/\D/g, "").slice(0, 2),
                      )
                    }
                  />
                  <Input
                    label="Year"
                    placeholder="YY"
                    value={cardDetails.expiryYear}
                    onChange={(e) =>
                      handleCardChange(
                        "expiryYear",
                        e.target.value.replace(/\D/g, "").slice(0, 2),
                      )
                    }
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      handleCardChange(
                        "cvv",
                        e.target.value.replace(/\D/g, "").slice(0, 4),
                      )
                    }
                  />
                </div>
              </motion.div>
            )}

            {paymentMethod === "wallet" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-white/80">
                  You will be redirected to your digital wallet provider to
                  complete the payment.
                </p>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={isProcessing}
          >
            Back
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Complete Booking"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
