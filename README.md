# Aurora Flight Booking

Lightweight Next.js flight booking UI demo built with React, Tailwind CSS, and Zustand for state management. This repository contains a small multi-step booking flow (search, select seats, review) and reusable UI components for prototyping booking experiences.

**Project**: - **Description**: Aurora Flight Booking is a front-end demo showcasing a streamlined flight search and booking UI built on Next.js.

**Features**

- **Multi-step flow**: Search, select seats, and review booking.
- **Component-driven**: Reusable UI primitives and booking components.
- **Responsive**: Mobile-first layout using Tailwind CSS.
- **Local state**: Lightweight state using `zustand` for booking data.

**Tech Stack**

- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS 4
- **State**: Zustand
- **Utilities**: date-fns, clsx, lucide-react

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

- **app/**: Next.js app routes and global layout (see [app/layout.tsx](app/layout.tsx) and [app/page.tsx](app/page.tsx)).
- **components/**: UI and booking components (see [components/booking/FlightCard.tsx](components/booking/FlightCard.tsx)).
- **hooks/**: Custom hooks and the booking store (see [hooks/useBookingStore.ts](hooks/useBookingStore.ts)).
- **lib/**: Utilities (see [lib/utils.ts](lib/utils.ts)).
- **public/**: Static assets.
- **styles**: Global styles are in [app/globals.css](app/globals.css).

**Notes & Development**

- This is a front-end prototype — there is no backend or persistent data store.
- To extend: add API routes under `app/api` or integrate a backend for persistence.

**Contributing**

- Suggestions and PRs welcome. For quick fixes, open a branch, make changes, and submit a pull request.

**License**

- MIT — adapt and reuse freely.
