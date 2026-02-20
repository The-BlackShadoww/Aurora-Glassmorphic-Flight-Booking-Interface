"use client";
import { motion } from "motion/react";
import { Plane, Ticket, User, Armchair, CreditCard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  icon: any;
}

const steps: Step[] = [
  { id: 1, title: "Search", icon: Plane },
  { id: 2, title: "Flights", icon: Ticket },
  { id: 3, title: "Passengers", icon: User },
  { id: 4, title: "Seats", icon: Armchair },
  { id: 5, title: "Payment", icon: CreditCard },
];

interface ProgressStepperProps {
  currentStep: number;
}

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12 px-4">
      <div className="relative flex justify-between items-center">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 -z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center z-10">
              <motion.div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border-2 transition-all",
                  isCompleted &&
                    "bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-400",
                  isCurrent && "bg-white/20 border-white/40 animate-glow",
                  !isCompleted && !isCurrent && "bg-white/5 border-white/10",
                )}
                whileHover={{ scale: 1.1 }}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Check className="w-8 h-8 text-white" />
                  </motion.div>
                ) : (
                  <Icon
                    className={cn(
                      "w-8 h-8",
                      isCurrent ? "text-white" : "text-white/40",
                    )}
                  />
                )}
              </motion.div>
              <p
                className={cn(
                  "mt-3 text-sm font-medium transition-colors",
                  isCurrent ? "text-white" : "text-white/50",
                )}
              >
                {step.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
