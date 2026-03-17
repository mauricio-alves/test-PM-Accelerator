---
name: mauricio-architecture
description: Architecture standards, design patterns, and clean-code principles used in Mauricio's frontend projects. Serves as the mandatory reference for AI agents to start any React/TypeScript/Node.js project using a test-first approach.
---

# Mauricio's Frontend Architecture & Design Patterns

**Core Stack**: React, TypeScript, and Node.js.

This document describes the architectural decisions and design patterns applied in Mauricio's frontend repositories. **When any AI agent initiates a new project or feature for Mauricio, it MUST strictly follow these principles from the very beginning.**

## 🚨 MANDATORY AI AGENT WORKFLOW: Test-First Approach 🚨
This architecture relies heavily on **Test-Driven Development (TDD)**. When generating new features or projects:
1. **Never write implementation code first**. Understand the requirement.
2. **Write the tests first**: Write the Unit or Integration test for the expected behavior (using Vitest, Jest, or React Testing Library).
3. **Draft the types and interfaces** in TypeScript.
4. **Only after tests are written**, generate the actual React component, hook, or Node.js service required to make the tests pass.

## 1. Directory Structure and Modularization

The project architecture promotes high cohesion and low coupling through the following separation of responsibilities (S.O.L.I.D - *Single Responsibility Principle*):

- **`/src/components`**: Dumb/Presentational UI Components. They should receive data via `props` and emit events, without heavy business logic. If there are persistent structural components (e.g., Header, Sidebar), group them internally (e.g., `/components/layout`).
- **`/src/pages`**: Smart Components that group layouts and smaller components, handling the structure of each application route.
- **`/src/hooks`**: Extraction of complex logic and React lifecycle into Custom Hooks. Keeps visual components clean.
- **`/src/contexts`**: Global application state management (React Context API).
- **`/src/services`**: Integration layer with external APIs and Backend. HTTP request functions (e.g., Axios/Fetch) are isolated here, separating communication rules from UI rules.
- **`/src/schemas`**: Data and form validations (e.g., Zod, Yup), isolating business/validation rules from components.
- **`/src/interfaces` and `/src/types`**: Centralized TypeScript static typings. **STRICT RULE**: Each interface or type must be defined in its own separate file to ensure modularity and avoid monolithic definition files.
- **`/src/utils`**: Pure utility functions, without side effects.
- **`/src/routes`** (Optional): Centralization of React Router configurations (especially useful when migrating to the v6.4+ object-based routing API).
- **`/src/assets`**: Static files (images, SVGs, fonts).
- **`/src/tests`**: Central directory or standard pattern for test files to ensure reliability (*Testing Pyramid*).

## 2. Design Patterns

*   **Container/Presentational Pattern**: Clear separation between who fetches/manages data (`pages/` or `hooks/`) and who displays it (`components/`).
*   **Custom Hooks Pattern**: Reusable React logic is abstracted into the `src/hooks` folder, applying the DRY (Don't Repeat Yourself) principle.
*   **Service Layer Pattern**: Communication with APIs must never be done directly within components. It is encapsulated in the `services/` folder.
*   **Validation Schema Pattern**: Heavy use of declarative validation rules separated into `schemas/`, leaving form handler logic lean.
*   **Version Pinning & Tokens**: When using CSS Frameworks (e.g., Tailwind), explicitly define the version (v3 vs v4) to avoid broken PostCSS plugins and ensure custom theme tokens (Glassmorphism, etc.) are properly mapped.

## 3. Clean Code Practices

1.  **Single Responsibility Principle (SRP)**: Each file and function should do only one thing. If a screen component fetches data, validates it, submits it to the backend, and renders the UI, it is violating SRP. Delegate fetching to a Service, validation to a Schema, and management to a Hook.
2.  **Clear Naming & Zero Comments**: Variables, functions, and files use self-explanatory names. **STRICT ZERO COMMENTS POLICY**: The code must be 100% self-documenting. Inline, block, or JSDoc comments are strictly forbidden.
3.  **Dependency Injection**: Props are used to pass dependencies into components, facilitating testing.
4.  **Pragmatic Destructuring**: Use of destructuring, *early returns* (guard clauses), and avoiding deep nesting of conditionals (`if/else`).
5.  **Naming Conventions**:
    - **PascalCase**: Components, Pages, and Interfaces/Types.
    - **camelCase**: Hooks, Services, Utils, and Variables.
    - **kebab-case**: Folder names and CSS classes.

## 4. Integration and Extension

When starting new development in this ecosystem:
- **Do not mix UI with API**: Always create appropriate services.
- **Reuse and Type**: Always check the `types` or `interfaces` folder before creating custom `any` data contracts.
- **Get rid of Complexity**: If a component exceeds 150-200 lines, it probably needs to be broken down into smaller components, or its logic extracted to a Hook.

## 5. Advanced React Practices (Performance and Scale)

To ensure an optimized rendering flow in future projects, adopt the following scalability patterns:

1. **Code Splitting and Lazy Loading**: Never import all pages statically at the top of the routes file (e.g., `App.tsx`). Use `React.lazy()` and `<Suspense fallback={<Loader />}>` to bundle pages separately, loading the code on demand only when the route is accessed.
2. **Grouped Routes (DRY - Don't Repeat Yourself)**: Avoid repeating Layout wrappers for each route individually in React Router. Group routes that share the same layout by encapsulating them inside a parent `<Route element={<Layout />}>` with multiple children.
3. **Barrel Pattern (Index Exporting)**: Every component or page folder must contain an `index.ts` that exports the main entity. Imports from other files should point to the folder itself (e.g., `import { Dashboard } from "./pages/Dashboard"`) and not to specific internal files.
4. **Modern Router (React Router v6.4+)**: In new projects (Vite/SPA), prefer `createBrowserRouter` and the use of the `<RouterProvider>` component. This decouples data fetching from the component rendering cycle using `loaders` and `actions`, significantly improving initial navigation performance (Render-as-You-Fetch).
5. **Data Mapping (DTO Layer)**: Services MUST transform external API responses (often in snake_case) into internal application models (camelCase). This prevents external API changes from leaking into UI components.
6. **Mandatory Fallback UI**: Every asynchronous operation must have a defined **Loading State** (prefer Skeletons over generic Spinners) and an **Error State** to maintain the "Premium Aesthetics" during network failures.

## 6. Security Best Practices

Security must be an integral part of the architecture, not an afterthought. When building front-end applications under these guidelines, adopt the following security practices:

1. **Environment Variables & Secrets**: NEVER hardcode API keys, passwords, or secrets in the frontend code. Always use environment variables. In Vite, only expose variables that must be public using the `VITE_` prefix. **MANDATORY**: Always provide a `.env.example` file in the root with empty placeholders for all required keys.
2. **XSS (Cross-Site Scripting) Prevention**: React inherently escapes injected strings, but you must strictly avoid rendering raw HTML. Never use `dangerouslySetInnerHTML` unless rendering from a strictly trusted and sanitized source (e.g., using `DOMPurify`).
3. **Secure Token Storage**: Avoid storing sensitive data like JWT tokens or PII (Personally Identifiable Information) in `localStorage` or `sessionStorage` due to XSS vulnerability. Prefer `HttpOnly` cookies for session management when possible. 
4. **Dependency Management**: Regularly audit and update project dependencies. Vulnerabilities in standard npm packages can quickly compromise a SPA. Keep dependencies lean and run `npm audit` frequently.
5. **CORS and CSRF**: Ensure the backend API employs strict CORS policies. If using cookies for authentication, ensure they have `SameSite=Strict` or `Lax` to prevent Cross-Site Request Forgery (CSRF).
6. **Version Control Safety**: A `.gitignore` file must be present at the root level of every project to prevent the leakage of sensitive files (`.env`), system files, `coverage/` report directories, and the `node_modules` directory.

## 7. Testing Strategy (TDD & Quality Assurance)

Robust frontend applications require a solid testing foundation to prevent regressions and document expected behavior. For Mauricio's architecture, adopt the following Testing Pyramid principles:

1. **Test-Driven Development (TDD) as a Mindset**: Write tests before implementing business logic and complex components. This forces clear requirements, decoupling, and dependency injection from the very beginning. Write the test -> Watch it fail -> Implement the minimum code to pass -> Refactor to Clean Code.
2. **Unit Tests (Core Focus)**: The majority of your tests should live here. Use tools like `Vitest` or `Jest` to independently test:
    - `src/utils/`: Pure functions and business rules.
    - `src/hooks/`: React lifecycle logic (using `@testing-library/react-hooks`).
    - `src/services/`: API mapping and error handling (mocking the HTTP client).
    - **MANDATORY DEV-DEPENDENCIES**: Every project setup must include `@vitest/coverage-v8` for metrics and `jsdom` for the testing environment.
3. **Integration & Real-Data Tests**: Beyond mocks, implement integration tests that perform real network requests to the target API. This ensures the service layer contracts match the actual external data structure.
4. **Colocation**: Keep test files close to their implementation (e.g., `Button.tsx` and `Button.test.tsx` in the same component folder) for better context and maintainability, overriding the `src/tests` generic folder strategy unless specifically testing entire page aggregations.
5. **UI/UX Verification**: After styling changes, perform a manual walkthrough or use automated browser tools to verify that Premium Aesthetics (Glassmorphism, animations) are correctly rendered.

> This knowledge is based on Mauricio's experience developing personal projects and technical tests, and is refined with S.O.L.I.D, Clean Code, modern React API audits, Enterprise Security, and Robust Testing strategies.
