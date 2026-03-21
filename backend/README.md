# Weather App - Backend

This is the backend server for the Weather App, developed as part of the AI Engineer Intern technical test. The focus of this project was the implementation of a robust, secure, and fully tested (TDD) architecture.

## 🚀 Technologies

- **Node.js & Express:** Main framework.
- **TypeScript:** Strict typing for safety and maintainability.
- **Prisma ORM:** Database interaction via PostgreSQL.
- **PostgreSQL:** Relational database (Docker) for history and log persistence.
- **Vitest:** Unit testing framework.
- **Swagger (OpenAPI 3.0):** Interactive API documentation.
- **Docker:** Containerization for database and environment.
- **Open-Meteo API:** Open-source weather data source (Geocoding and Forecast).
- **tsx:** Real-time TypeScript file execution and monitoring.

## 🛡️ Implemented Security

- **Helmet:** HTTP header protection.
- **Rate Limit:** Protection against abuse and brute force.
- **CORS:** Access restriction to authorized frontend.
- **Validation**: Strict input parameter validation.

---

## 🧩 Architecture (SRP)

The backend follows the **Single Responsibility Principle (SRP)**, organized into layers to facilitate testing and maintenance:

- **`MeteoProvider`**: Solely responsible for external calls to weather and geocoding APIs. Isolates Axios usage.
- **`WeatherRepository`**: Exclusively responsible for database operations via Prisma.
- **`CsvFormatter`**: Utility focused only on formatting data for export.
- **`WeatherService`**: Orchestrator that coordinates providers and repositories to deliver API features.

---

## 🛠️ How to Run

Follow these steps in the exact order to ensure correct operation:

1. **Install dependencies:**
   Inside the `backend` folder, run:

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `backend` folder based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   _Note: Make sure to adjust credentials according to your environment._

3. **Start the Database (Docker):**
   In the **project root** (where the `docker-compose.yml` file is located), run:

   ```bash
   docker-compose up -d db
   ```

4. **Prepare the Database (Prisma):**
   Back in the `backend` folder, generate the client and sync the schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Server in Development:**
   ```bash
   npm run dev
   ```
   The server will be active at: `http://localhost:3001`

---

## 📖 API Documentation

Complete interactive documentation can be accessed at: `http://localhost:3001/api-docs`

### Available Endpoints:

#### 1. `GET /api/weather`

- **Description:** Search for current weather data, 5-day forecast, and AI recommendations.
- **Parameters:** `city` (string, mandatory).
- **Returns:** Object containing `temp`, `description`, `forecast[]`, and `recommendation`.

#### 2. `GET /api/history`

- **Description:** Returns the history of the last queried forecasts.
- **Returns:** List of the last 10 records saved in the database, sorted by most recent.

#### 3. `GET /api/logs`

- **Description:** Returns the logs of user search terms.
- **Returns:** List of the last 20 performed searches (term and timestamp only).

#### 4. `DELETE /api/history/:id` [NEW]

- **Description:** Deletes a specific history record (idempotent operation).

#### 5. `DELETE /api/history` [NEW]

- **Description:** Clears the entire search history from the database.

#### 6. `GET /api/export` [NEW]

- **Description:** Exports the complete history.
- **Parameters:** `format` (json or csv).
- **Returns:** Formatted file download.

---

## 🧪 Testing and Quality (Optional)

The project follows TDD (Test Driven Development) methodology focusing on `WeatherService.ts`, achieving:

- **94% Line coverage in `WeatherService.ts`.**
- **100% Coverage in `WeatherRepository.ts`.**
- **90.0% Coverage in `MeteoProvider.ts`.**
- **100% Coverage in critical utilities.**
- **Resilience:** Retry system for external APIs and geographic error handling.

To run tests:

```bash
npm run test
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
