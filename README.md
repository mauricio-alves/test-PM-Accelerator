# 🌦️ Weather App - PM Accelerator AI Engineer Intern Challenge

This repository contains the **Weather App Fullstack** project, developed as part of the selection process for the **AI Engineer Intern** position at **PM Accelerator**. The central objective is to provide users with real-time weather information through a modern and secure interface.

## 📋 About the Project

The Weather App is a complete solution that combines a robust Node.js backend with a performant Next.js frontend. The system allows searching for weather conditions in any city, maintaining a persisted search history, and offering a premium visual experience.

### Key Features

- **Global Search**: Search by location terms (Cities, Countries).
- **Advanced Forecast**: Detailed display of current conditions and **5-day forecast**.
- **AI & Recommendations**: Intelligent suggestions for activities and clothing, dynamically translated.
- **Internationalization (i18n)**: Full support for **Portuguese (PT-BR)** and **English (EN)** with preference persistence. [NEW]
- **History Management (CRUD)**: Ability to delete individual records or clear the entire history. [NEW]
- **Data Export**: Download of search history in **JSON** and **CSV** formats. [NEW]
- **Geolocation**: Automatic city detection based on browser location (OpenStreetMap). [NEW]
- **Dynamic Widgets**: Modular integration with specialized **Map** and **Video** widgets.
- **History & Logs**: Persistence of recent searches and search terms in PostgreSQL.
- **Premium UI**: Glassmorphism interface with dynamic themes (Day/Night), Skeleton Loaders, and fluid animations.
- **Resilience**: Backend with **Axios Retries**, idempotent deletions, and optimized Prisma client.
- **Security**: Protection with Helmet, Rate Limit, CORS, and Swagger documentation (/api-docs).

---

## 🏗️ Monorepo Structure

The project is organized into two main parts:

- **[Backend](file:///c:/Users/maual/Downloads/test-PM-Accelerator/backend/README.md)**: RESTful API in Express + Prisma + PostgreSQL. Focused on CRUD, security, and persistence.
- **[Frontend](file:///c:/Users/maual/Downloads/test-PM-Accelerator/frontend/README.md)**: Next.js 16 application with Tailwind CSS v4 and Vitest. Focused on UX and data visualization.

---

## 🚀 How to Start

### Prerequisites

- **Node.js** (v18+)
- **Docker & Docker Compose** (for the database)

### Quick Step-by-Step

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   cd test-PM-Accelerator
   ```

2. **Start the Project via Docker (Full Stack)**:

   ```bash
   docker-compose up -d
   ```

   _This will bring up the Backend (3001), Frontend (3000), and the Database (5432)._

3. **Configure and run the Backend**:
   Refer to the [Backend README](file:///c:/Users/maual/Downloads/test-PM-Accelerator/backend/README.md) for installation details and environment variables.

4. **Configure and run the Frontend**:
   Refer to the [Frontend README](file:///c:/Users/maual/Downloads/test-PM-Accelerator/frontend/README.md) for connection details with the API and execution.

---

## 🧪 Code Quality (TDD)

Both layers of the project were developed following **Clean Code**, **SOLID**, and **TDD** practices:

- **Backend**: **94%** line coverage in `WeatherService.ts` and 100% in `WeatherRepository.ts`.
- **Frontend**: **89.7%** coverage in `useWeather.ts` hook and **> 80%** global coverage across critical components and utils.
- **Architecture (SRP)**: Ultra-modular architecture with strict separation of concerns (Repositories, Providers, Atomic Components).
- **Resilience**: Full error flow validation and **Optimistic UI with automatic rollback**.

---

## 🤝 PM Accelerator

The **Product Manager Accelerator** is focused on preparing talent for the technology market, joining AI engineering and product management. This challenge demonstrates fullstack development skills, systems architecture, and user focus.

---

**Developed by:** [Maurício Alves](https://www.linkedin.com/in/mauricio-oliveira-alves/) - AI Engineer Intern Candidate
