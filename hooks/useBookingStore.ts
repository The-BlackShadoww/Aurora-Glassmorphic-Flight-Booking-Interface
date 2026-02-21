import { create } from "zustand";

interface PriceAlert {
  id: string;
  route: string;
  targetPrice: number;
  isActive: boolean;
  createdAt: number;
}

interface PriceHistory {
  route: string;
  prices: Array<{ price: number; timestamp: number }>;
}

interface BookingStore {
  currentStep: number;
  selectedFlight: string | null;
  passengers: any[];
  selectedSeats: string[];
  priceAlerts: PriceAlert[];
  priceHistory: PriceHistory[];
  setCurrentStep: (step: number) => void;
  setSelectedFlight: (id: string) => void;
  addPassenger: (passenger: any) => void;
  toggleSeat: (seat: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  addPriceAlert: (route: string, targetPrice: number) => void;
  removePriceAlert: (id: string) => void;
  recordPrice: (route: string, price: number) => void;
  getPriceHistory: (route: string) => PriceHistory | undefined;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  currentStep: 1,
  selectedFlight: null,
  passengers: [],
  selectedSeats: [],
  priceAlerts: [],
  priceHistory: [],

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
  addPriceAlert: (route, targetPrice) =>
    set((state) => ({
      priceAlerts: [
        ...state.priceAlerts,
        {
          id: Date.now().toString(),
          route,
          targetPrice,
          isActive: true,
          createdAt: Date.now(),
        },
      ],
    })),
  removePriceAlert: (id) =>
    set((state) => ({
      priceAlerts: state.priceAlerts.filter((alert) => alert.id !== id),
    })),
  recordPrice: (route, price) =>
    set((state) => {
      const existingHistory = state.priceHistory.find((h) => h.route === route);
      if (existingHistory) {
        return {
          priceHistory: state.priceHistory.map((h) =>
            h.route === route
              ? {
                  ...h,
                  prices: [...h.prices, { price, timestamp: Date.now() }],
                }
              : h,
          ),
        };
      }
      return {
        priceHistory: [
          ...state.priceHistory,
          { route, prices: [{ price, timestamp: Date.now() }] },
        ],
      };
    }),
  getPriceHistory: (route) => {
    return get().priceHistory.find((h) => h.route === route);
  },
}));
