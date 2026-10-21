# Weather Intelligence

A modern, production-ready Weather Intelligence web application built with **React**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons** (`lucide-react`), running as a high-performance Single-Page Application (SPA) powered by Vite.

---

## Features

1. **Geocoding Search & Autocomplete**
   - Live, debounced search using the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api).
   - Autocomplete dropdown displaying matching cities, administrative divisions, countries, and geographic coordinates.
   - Keyboard navigation support (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).

2. **Real-Time & 7-Day Forecast**
   - High-resolution synoptic forecasts via the [Open-Meteo Forecast API](https://open-meteo.com/en/docs).
   - Real-time temperature (°C and °F unit toggle), wind speed, wind direction, daily precipitation sum, and thermal ranges.
   - WMO Weather interpretation code mapping with matching iconography and contextual descriptions.
   - Interactive 7-day forecast cards with relative temperature range bars and a detailed daily inspector.

3. **Planning Recommendations Engine**
   - Rule-based decision advice dynamically generated from current and daily conditions:
     - **Precipitation > 0 mm**: *"Bring an umbrella and wear waterproof shoes."*
     - **High Temp > 30°C**: *"Stay hydrated and wear light clothing; hot day ahead."*
     - **High Temp < 15°C**: *"Wear warm layers or a jacket."*
     - **Wind Speed > 20 km/h**: *"Breezy conditions; secure outdoor items."*
     - **Clear Weather (18°C–28°C)**: *"Ideal conditions for outdoor sports and travel."*

4. **Outdoor Activity Suitability Matrix**
   - Evaluates suitability for running, cycling, outdoor dining, and sightseeing based on meteorological risk factors (traction, wind gusts, thermal comfort, precipitation).

5. **Resilient UX & Error Handling**
   - Skeleton loader matching layout geometry during network requests.
   - User-friendly error states with retry actions and popular city shortcuts.
   - Default city initialization (Chennai / London) on initial load for instant populated view.

6. **Deployment & SPA Routing Compatibility**
   - Configured with `dist` build output.
   - Includes static SPA routing redirect configuration (`public/_redirects`) for seamless page refreshes on Cloudflare Pages, Netlify, and other static hosts.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React (`lucide-react`)
- **APIs**: Open-Meteo Geocoding API & Open-Meteo Weather Forecast API (No API keys required)

---

## Project Structure

```
├── public/
│   └── _redirects              # Static SPA routing redirects (/* /index.html 200)
├── src/
│   ├── components/
│   │   ├── ActivityPlanner.tsx       # Activity feasibility cards
│   │   ├── CurrentWeatherCard.tsx    # Current weather primary display
│   │   ├── ErrorMessage.tsx          # Error notification with retry & fallbacks
│   │   ├── ForecastCard.tsx          # Individual daily forecast card
│   │   ├── ForecastGrid.tsx          # 7-day responsive grid with day inspector
│   │   ├── LoadingSkeleton.tsx       # Skeleton loader
│   │   ├── Navbar.tsx                # App header, unit switch & quick cities
│   │   ├── SearchBar.tsx             # Geocoding search input & dropdown
│   │   └── WeatherIcon.tsx           # Dynamic Lucide icon resolver
│   ├── services/
│   │   └── openMeteo.ts              # Geocoding and Weather forecast API clients
│   ├── types/
│   │   └── weather.ts                # TypeScript interfaces and types
│   ├── utils/
│   │   ├── formatters.ts             # Units, temperatures, dates & wind directions
│   │   ├── recommendations.ts        # Planning recommendations & activity logic
│   │   └── weatherCodes.ts           # WMO weather code dictionary & styles
│   ├── App.tsx                       # Main dashboard layout and state container
│   ├── index.css                     # Tailwind setup & custom utilities
│   └── main.tsx                      # React root entry point
├── index.html                        # HTML entry point with metadata
├── metadata.json                     # App metadata
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript compiler configuration
└── vite.config.ts                    # Vite build configuration (outDir: dist)
```

---

## Getting Started

### Installation

```bash
npm install
```

### Development Server

Run the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production Build

Compile the application for production:

```bash
npm run build
```

The output will be generated in the `dist` folder, ready for deployment to any static hosting provider.

### Type Check & Lint

```bash
npm run lint
```

---

## License

Apache-2.0
