# src/actions — Conventions

## Overview
This directory serves as the centralized, type-safe gateway for all client-initiated data mutations and business logic (Actions). All actions must adhere to a structured pattern involving Zod validation, session checks, and wrapper functions to ensure a consistent execution flow, error handling, and data isolation from the client.

## Patterns
*   **Structure:** Actions are grouped into exported constant objects (e.g., `export const auth = {...}`, `export const habit = {...}`).
*   **Definition:** Every public action must use `defineAction({ ... })` from `astro:actions`.
*   **Input Validation:** Actions must include an `input: z.object({...})` schema to validate incoming client data immediately.
*   **Execution Flow:** Handlers must typically follow this sequence:
    1.  Obtain context/user (`getAuthenticatedUser` or `createClient(context)`).
    2.  Execute mutation logic (using internal helper functions like `createHabit`).
    3.  Handle potential errors/return results.
*   **Authorization/Safety:** Helper functions (`getAuthenticatedUser`, `getAuthError`) should be used to manage access control.
*   **Error Handling:** Custom helper functions (e.g., `getAuthError`) must be used to return structured, consumable errors rather than raw exceptions.

## Draft the Authentication Logic
Always wrap authentication logic in dedicated functions rather than embedding raw checks inside action bodies. Use the `getAuthenticatedUser` pattern to retrieve the current user and handle unauthorized access gracefully.

## Draft the Data Modeling
When defining complex data structures, use Zod schemas (e.g., `z.object(...)`) to ensure type safety across inputs and outputs.

## Draft the Component Composition
Components should be composed using functional React components. State management should utilize React hooks (e.g., `useState`, `useReducer`).

## Draft the Testing Coverage
Components must be tested using React Testing Library, focusing on user interaction paths. Mock external API calls using MSW (Mock Service Worker).

## Draft the Directory Structure
Use atomic design principles. Components should reside in `src/components`, hooks in `src/hooks`, and utility functions in `src/utils`.
