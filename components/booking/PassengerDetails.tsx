'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useBookingStore } from '@/hooks/useBookingStore';
import { User, Mail, Phone } from 'lucide-react';

interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: 'adult' | 'child' | 'infant';
}

export default function PassengerDetails() {
  const { nextStep, previousStep, addPassenger, passengers: savedPassengers } =
    useBookingStore();
  const [passengers, setPassengers] = useState<Passenger[]>(
    savedPassengers.length > 0
      ? savedPassengers
      : [
          {
            id: '1',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            type: 'adult',
          },
        ]
  );

  const handleInputChange = (
    id: string,
    field: keyof Passenger,
    value: string
  ) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addNewPassenger = () => {
    const newPassenger: Passenger = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      type: 'adult',
    };
    setPassengers((prev) => [...prev, newPassenger]);
  };

  const removePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleContinue = () => {
    // Validate
    const allFilled = passengers.every(
      (p) =>
        p.firstName.trim() &&
        p.lastName.trim() &&
        p.email.trim() &&
        p.phone.trim()
    );

    if (!allFilled) {
      alert('Please fill in all passenger details');
      return;
    }

    // Save to store
    passengers.forEach((p) => addPassenger(p));
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Passenger Details</h2>
          <p className="text-white/60">
            Enter the names and contact information for all passengers
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {passengers.map((passenger, index) => (
            <motion.div
              key={passenger.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Passenger {index + 1} ({passenger.type})
                  </h3>
                  {passengers.length > 1 && (
                    <button
                      onClick={() => removePassenger(passenger.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="John"
                    value={passenger.firstName}
                    onChange={(e) =>
                      handleInputChange(
                        passenger.id,
                        'firstName',
                        e.target.value
                      )
                    }
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    value={passenger.lastName}
                    onChange={(e) =>
                      handleInputChange(passenger.id, 'lastName', e.target.value)
                    }
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={passenger.email}
                    onChange={(e) =>
                      handleInputChange(passenger.id, 'email', e.target.value)
                    }
                  />
                  <Input
                    label="Phone"
                    placeholder="+1 (555) 123-4567"
                    value={passenger.phone}
                    onChange={(e) =>
                      handleInputChange(passenger.id, 'phone', e.target.value)
                    }
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 justify-center mb-8"
        >
          <Button variant="outline" onClick={addNewPassenger}>
            + Add Passenger
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Button variant="outline" onClick={previousStep}>
            Back
          </Button>
          <Button onClick={handleContinue}>Continue to Seat Selection</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
