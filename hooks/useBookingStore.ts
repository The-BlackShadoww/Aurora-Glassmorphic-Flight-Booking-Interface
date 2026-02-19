import { create } from "zustand";

interface BookingStore {
  currentStep: number;
  selectedFlight: string | null;
  passengers: any[];
  selectedSeats: string[];
  setCurrentStep: (step: number) => void;
  setSelectedFlight: (id: string) => void;
  addPassenger: (passenger: any) => void;
  toggleSeat: (seat: string) => void;
  nextStep: () => void;
  previousStep: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  currentStep: 1,
  selectedFlight: null,
  passengers: [],
  selectedSeats: [],

  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedFlight: (id) => set({ selectedFlight: id }),
  addPassenger: (passenger) =>
    set((state) => ({
      passengers: [...state.passengers, passenger],
    })),
  toggleSeat: (seat) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.includes(seat)
        ? state.selectedSeats.filter((s) => s !== seat)
        : [...state.selectedSeats, seat],
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),
  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
}));
