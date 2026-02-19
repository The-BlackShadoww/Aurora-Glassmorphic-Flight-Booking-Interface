"use client";

import GradientBackground from "@/components/layout/GradientBackground";
import ProgressStepper from "@/components/booking/ProgressStepper";
import FlightSearch from "@/components/booking/FlightSearch";
import FlightResults from "@/components/booking/FlightResults";
import PassengerDetails from "@/components/booking/PassengerDetails";
import SeatSelection from "@/components/booking/SeatSelection";
import PaymentStep from "@/components/booking/PaymentStep";
import { useBookingStore } from "@/hooks/useBookingStore";

export default function Home() {
  const { currentStep } = useBookingStore();

  return (
    <main className="min-h-screen relative">
      <GradientBackground />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-6xl font-bold text-center text-white mb-4">
          Aurora
        </h1>
        <p className="text-white/60 text-center mb-12 text-lg">
          Experience flight booking reimagined
        </p>

        <ProgressStepper currentStep={currentStep} />

        {currentStep === 1 && <FlightSearch />}
        {currentStep === 2 && <FlightResults />}
        {currentStep === 3 && <PassengerDetails />}
        {currentStep === 4 && <SeatSelection />}
        {currentStep === 5 && <PaymentStep />}
      </div>
    </main>
  );
}
