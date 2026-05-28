# `src/actions/AGENTS.md` — Astro Actions Guidelines

This document governs the creation and structure of **Astro Actions** located in `src/actions/`. It expands on the principles defined in the master [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) constitution.

---

## 1. Role of Astro Actions

Astro Actions serve as the **sole entry points** for data mutations triggered by client-side islands or browser forms. They validate payloads on the server, handle session authentication, and delegate the actual mutation tasks to your data access layer.

---

## 2. Key Action Conventions

Every action handler must follow a strict three-phase design:

```sh
[ Client Request ]
       │
       ▼
1. Validate Schema  ──( Fail? )──> [ ActionError (BAD_REQUEST) ]
       │
       ▼
2. Authenticate User ──( Fail? )──> [ ActionError (UNAUTHORIZED) ]
       │
       ▼
3. Delegate Mutation ──( Fail? )──> [ ActionError (INTERNAL_SERVER_ERROR) ]
       │
       ▼
[ Client Response ]
```

### 1. Payload Validation (Zod)
* Validate all payloads using Zod schemas (`defineAction({ input: z.object({...}) })`).
* Ensure Zod schemas represent the post-transformation payload.
* Use UUID validators (`z.string().uuid()`) for IDs and regular expressions for standard formats (e.g., date strings).

### 2. Session Authentication
* Verify the user session before performing any operations using `getAuthenticatedUser(context)` or custom session helpers.
* Throw an `ActionError` with code `UNAUTHORIZED` if the session is invalid or missing.

### 3. Thin Action Handlers (Delegation)
* Actions are **orchestrators**, not transaction executors.
* They should validate the payload, verify the user, and then immediately delegate database writes or streak updates to mutation functions inside `src/lib/{domain}/mutations.ts`.
* Avoid writing direct Supabase `.insert()` or `.update()` queries inside action handler bodies.

---

## 3. Custom Error Codes

When throwing `ActionError`, map database or validation failures to standard Astro action codes:
* Payloads or parameters validation failures → `BAD_REQUEST`
* Expired or missing authentication sessions → `UNAUTHORIZED`
* Database exceptions, network timeouts, or server failures → `INTERNAL_SERVER_ERROR`

---

## 4. Reference to Root

Refer to [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) for core tech stack and file naming conventions.
