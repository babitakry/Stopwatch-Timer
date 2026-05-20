# Minimalist Stopwatch & Timer Application

A lightweight, responsive, and highly interactive timekeeping web application built using **React**, **TypeScript**, and **Tailwind CSS v4**. This application features a clean, Apple-inspired minimalist design, tactile micro-interactions, and drift-free state management.

---

## Live Demo & Repository
- **Repository Link:** [GitHub Repository](https://github.com/babitakry/Stopwatch-Timer)
- **Deployed Link:** [Vercel / Netlify Deploy](https://stopwatch-timer-app.vercel.app) *(Replace with your actual URL)*

---

## Features

### Stopwatch
- **High Precision:** Displays hours, minutes, seconds, and centiseconds (tenths of a second) at a smooth 10ms render rate.
- **Drift-Free Architecture:** Leverages system delta-time (`Date.now() - elapsedTime`) rather than relying on sequential state increments, preventing interval lags or browser timer drift.
- **Controls:** Intuitive Start, Pause, and Reset workflows.

### Countdown Timer
- **Custom Input:** User-defined duration via interactive Hours, Minutes, and Seconds inputs.
- **Auto-Validation:** Enforces numeric-only inputs and caps minutes/seconds values to `59` automatically.
- **State Preservation:** Keeps countdown time in a separate variable, allowing you to pause, resume, and reset smoothly while maintaining input configurations.

### Visuals & UX
- **Apple-Inspired Design:** Minimalist layout built around dark accents, clean shadows, and custom neutral backgrounds.
- **Tabular Numerics:** Standardized monospaced digits (`tabular-nums`) to prevent horizontal jittering of layout text during countdowns.
- **Micro-Interactions:** 
  - Dynamic buttons that lift (`hover:-translate-y-0.5`) and expand shadows.
  - Tactile spring scaling (`active:scale-[0.98]`) on clicks.
  - Smooth opacity fades indicating active or idle timer states.
  - Hover-aware inputs and labels.

---

## Architecture & Components

The application structure is fully modularized and strongly typed:

```
src/
├── App.tsx               # Main container & tab navigation logic
├── index.css             # Tailwind v4 imports and custom @theme variables
├── main.tsx              # React mounting root
└── components/
    ├── Stopwatch.tsx     # Stopwatch module (state, refs, UI)
    └── Timer.tsx         # Timer module (inputs, validation, countdowns)
```

- **Interval Handling:** Utilizes React's `useRef` to store active `setInterval` references. This guarantees timers are cleared correctly on component unmounts, preventing memory leaks.
- **Tailwind CSS v4 `@theme`**: All primary colors and border styling are mapped to CSS variables inside `index.css` for easy adjustments.

---

## Local Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/babitakry/Stopwatch-Timer.git
   cd Stopwatch-Timer
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Local Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173`.

4. **Run Production Build:**
   ```bash
   npm run build
   ```
   This creates an optimized production bundle inside the `/dist` directory.
