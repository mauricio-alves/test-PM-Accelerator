# Weather App - Frontend

This is the frontend client for the Weather App, developed as part of the AI Engineer Intern technical test. The focus of this project was the implementation of a modern interface with glassmorphism, component-based architecture, and robust test coverage.

## 🚀 Technologies

- **Next.js 16 (App Router):** React framework with SSR and Turbopack.
- **TypeScript:** Strict typing for safety and maintainability.
- **Tailwind CSS v4:** Utility-first styling with a custom design system.
- **Axios:** HTTP client for consuming the backend API.
- **Vitest + Testing Library:** Framework for unit and component testing.

## 🎨 Design

- **Glassmorphism:** Cards with `backdrop-blur`, translucent borders, and soft shadows.
- **Native Dark Mode:** `#09090b` background with dynamic themes based on weather (clear vs. cloudy sky).
- **Internationalization (i18n):** Custom context for language switching (PT/EN) with LocalStorage persistence. [NEW]
- **Geolocation:** Browser coordinate search with reverse Geocoding (Nominatim). [NEW]
- **Export:** Dynamic client-side generation of JSON/CSV files. [NEW]
- **Skeleton Loader:** Loading animation that mirrors the weather card layout.
- **Micro-animations:** `animate-in fade-in slide-in-from-bottom` and premium hover effects.
- **Dynamic Icons:** Emoji mapped by weather condition and translated AI Insights.
- **Resilience and UX:** Implementation of **Optimistic UI** (instant deletion) with **Automatic Rollback** in case of network failure, ensuring the interface never stays stuck or inconsistent. [PREMIUM]

## 🛠️ How to Run

1. **Install dependencies:**
   Inside the `frontend` folder, run:

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `frontend` folder based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   _The `NEXT_PUBLIC_API_URL` variable should point to the backend server (default: `http://localhost:3001`)._

3. **Ensure the backend is active:**
   The frontend consumes the API at `http://localhost:3001`. Follow the backend README to start it.

4. **Start in Development:**
   ```bash
   npm run dev
   ```
   The application will be available at: `http://localhost:3000`

---

## 🧩 Architecture

```
src/
├── app/              # Root layout and main page (Next.js App Router)
├── components/
│   ├── layout/
│   │   └── GlassContainer/   # Reusable base component (glassmorphism)
│   ├── common/
│   │   └── WeatherButton/    # Standardized UI buttons [NEW]
│   └── weather/
│       ├── WeatherDashboard/
│       │   ├── WeatherDashboard.tsx
│       │   └── DashboardControls.tsx # Theme/Lang/GPS controls [NEW]
│       ├── WeatherCard/      # Main card
│       │   ├── WeatherCard.tsx
│       │   └── WeatherRecommendation.tsx # AI Insights [NEW]
│       ├── ForecastList/     # 5-day forecast list
│       ├── ExtraWidgets/     # Layout container
│       │   ├── MapWidget.tsx   # Google Maps [NEW]
│       │   └── VideoWidget.tsx # YouTube [NEW]
│       ├── WeatherCardSkeleton/ # Skeleton loader during fetch
│       ├── SearchBar/        # Form with Geolocation support
│       └── HistoryList/
│           ├── HistoryList.tsx
│           ├── HistoryItem.tsx     # Individual history item [NEW]
│           └── HistoryActions.tsx  # Export/Clear actions [NEW]
├── context/
│   └── LanguageContext.tsx   # i18n management and persistence [NEW]
├── hooks/
│   ├── useWeather.ts         # State orchestrator and weather logic
│   └── useGeolocation.ts     # Specialized location hook [NEW]
├── services/
│   ├── api.ts                # Axios instance (with backend retries)
│   └── weatherService.ts     # Backend API calls
├── utils/                    # Centralized utilities [REFAC]
│   ├── dateUtils.ts          # PT-BR date formatting
│   ├── weatherUtils.ts       # WMO icon mapping
│   └── translations.ts       # i18n for descriptions
└── interfaces/               # TypeScript contracts separated by file
```

---

## 🧪 Testing and Quality

The project follows TDD methodology with comprehensive coverage:

- **89.79% Coverage in the Main Hook (`useWeather`).**
- **80% Coverage in `HistoryList` (Interactions and Rollback).**
- **100% Coverage in critical utilities and WeatherCard.**

To run the tests:

```bash
npm test
```

To see code coverage:

```bash
npm run test:coverage
```

## 🏗️ Production Build

```bash
npm run build
npm start
```
