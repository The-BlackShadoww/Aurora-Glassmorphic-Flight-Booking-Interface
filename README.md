# Aurora Flight Booking

Lightweight Next.js flight booking UI demo built with React, Tailwind CSS, and Zustand for state management. This repository contains a small multi-step booking flow (search, select seats, review) and reusable UI components for prototyping booking experiences.

## What's New

### 2026-03-02 (current)

- **Summary:** Added accessibility enhancements, basic unit tests, and updated documentation.

- **Highlights**
  - **Improved keyboard navigation** across all booking steps and form fields.
  - **ARIA labels and roles** added to key interactive components for screen-reader support.
  - **Basic Jest/React Testing Library tests** for `FlightSearch` and `FlightResults` components.
  - **Documentation**: expanded README with clearer setup instructions and architecture overview.

### 2026-02-23

- **Summary:** Adds new UI and experience improvements to make fare comparison and passenger entry faster and clearer.

- **Highlights**
  - **Flexible date search**: toggle a ±N‑day range around your selected date when planning a trip.
  - **Price comparison widget**: quick side-by-side fare comparisons across options (see `components/booking/PriceComparisonWidget.tsx`).
  - **Improved passenger details**: enhanced `PassengerDetails` form with better validation and layout.
  - **UI polish**: updated `GradientBackground` and `GlassCard` styles for a cleaner, modern look.
- **Theme support**: light/dark mode with persistent toggle in the header.

- **Try it locally**
  1.  Run `npm install` (if needed) and `npm run dev`.
  2.  Open http://localhost:3000 and perform a flight search to see the price comparison widget in the results.

If you'd like these notes shortened or converted into a changelog entry, tell me the desired format (release notes, changelog file, or GitHub release body).

**Project**: - **Description**: Aurora Flight Booking is a front-end demo showcasing a streamlined flight search and booking UI built on Next.js.

**Features**

- **Multi-step flow**: Search, select seats, and review booking.
- **Component-driven**: Reusable UI primitives and booking components.
- **Responsive**: Mobile-first layout using Tailwind CSS.
- **Local state**: Lightweight state using `zustand` for booking data.
- **Accessibility-first**: Keyboard support and ARIA enhancements throughout.
- **Unit tests**: Includes baseline Jest tests for core components.

**Tech Stack**

- **Framework**: Next.js 17
- **UI**: React 20, Tailwind CSS 4
- **State**: Zustand
- **Utilities**: date-fns, clsx, lucide-react
- **Testing**: Jest & React Testing Library

**Getting Started**

- **Requirements**: Node.js 18+ and npm (or pnpm/yarn).
- **Install**: Run `npm install` to install dependencies.
- **Development**: Run `npm run dev` and open http://localhost:3000.
- **Build**: Run `npm run build` to create a production build.
- **Start**: Run `npm run start` to serve the production build.

**Available Scripts**

- **dev**: `next dev` — runs the app in development mode.
- **build**: `next build` — builds the app for production.
- **start**: `next start` — starts the production server.
- **lint**: `eslint` — run the project's linter.

**Project Structure**

The repository is organized as follows:

```
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── booking/
│   │   ├── FlightCard.tsx
│   │   ├── FlightResults.tsx
│   │   ├── FlightSearch.tsx
│   │   ├── PassengerDetails.tsx
│   │   ├── PaymentStep.tsx
│   │   ├── PriceComparisonWidget.tsx
│   │   ├── ProgressStepper.tsx
│   │   ├── SavedSearches.tsx
│   │   └── SeatSelection.tsx
│   ├── layout/
│   │   ├── GradientBackground.tsx
│   │   └── ThemeProvider.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── GlassCard.tsx
│       ├── Input.tsx
│       └── ThemeToggle.tsx
├── hooks/
│   ├── useBookingStore.ts
│   └── use/   (additional hook utilities)
├── lib/
│   └── utils.ts
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── (other config and helper files)
```

- **app/**: Next.js app routes and global layout.
- **components/**: UI and booking components.
- **hooks/**: Custom hooks and the booking store.
- **lib/**: Utilities.
- **public/**: Static assets.
- **styles**: Global styles are in [app/globals.css](app/globals.css).

**Notes & Development**

- This is a front-end prototype — there is no backend or persistent data store.
- To extend: add API routes under `app/api` or integrate a backend for persistence.

**Contributing**

- Suggestions and PRs welcome. For quick fixes, open a branch, make changes, and submit a pull request.

**License**

- MIT — adapt and reuse freely.
