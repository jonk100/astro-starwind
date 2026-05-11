/**
 * @file src/pages/api/auth/login.ts
 * @description Handles email/password login (POST) and OAuth initiation (GET).
 * Updated to use the shared createClient factory from src/lib/supabase.ts,
 * which uses the non-deprecated getAll/setAll cookie API.
 */

import type { APIContext } from "astro";
import { createClient } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Valid OAuth providers supported by Supabase. */
type OAuthProvider = "github" | "google" | "discord";

// ─── Shared helper ────────────────────────────────────────────────────────────

/**
 * Builds a redirect Response and flushes any pending Set-Cookie headers
 * from context.cookies onto it. Astro accumulates cookie mutations in memory
 * during the request; this helper flushes them to the actual response.
 *
 * @param context  - The current Astro APIContext.
 * @param location - The URL to redirect to.
 * @param status   - HTTP status code (default 302 Found).
 * @returns A Response with Location and Set-Cookie headers set.
 */
function redirectWithCookies(
  context: APIContext,
  location: string,
  status = 302
): Response {
  const headers = new Headers({ Location: location });

  for (const cookie of context.cookies.headers()) {
    headers.append("Set-Cookie", cookie);
  }

  return new Response(null, { status, headers });
}

// ─── POST /api/auth/login — email + password ──────────────────────────────────

export const prerender = false;

/**
 * Handles form submission from /login.
 *
 * Flow:
 *   1. Parse email + password from the form body.
 *   2. Call supabase.auth.signInWithPassword().
 *   3. On success: session cookies are written; redirect to /.
 *   4. On failure: redirect to /login?error=<message>.
 *
 * @param context - Astro API context.
 * @returns A redirect Response.
 */
export async function POST(context: APIContext): Promise<Response> {
  const supabase = createClient(context);

  let email: string;
  let password: string;

  try {
    const body = await context.request.formData();
    email    = (body.get("email")    as string | null)?.trim() ?? "";
    password = (body.get("password") as string | null)?.trim() ?? "";
  } catch {
    return redirectWithCookies(
      context,
      "/login?error=" + encodeURIComponent("Could not read form data. Please try again.")
    );
  }

  if (!email || !password) {
    return redirectWithCookies(
      context,
      "/login?error=" + encodeURIComponent("Email and password are required.")
    );
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirectWithCookies(
      context,
      "/login?error=" + encodeURIComponent(error.message)
    );
  }

  return redirectWithCookies(context, "/");
}

// ─── GET /api/auth/oauth — OAuth provider initiation ─────────────────────────

/**
 * Kicks off a Supabase OAuth flow.
 * Usage: <a href="/api/auth/oauth?provider=github">Continue with GitHub</a>
 *
 * @param context - Astro API context.
 * @returns A redirect to the OAuth provider, or an error redirect.
 */
export async function GET(context: APIContext): Promise<Response> {
  const supabase = createClient(context);
  const provider = context.url.searchParams.get("provider") as OAuthProvider | null;

  const validProviders: OAuthProvider[] = ["github", "google", "discord"];

  if (!provider || !validProviders.includes(provider)) {
    return redirectWithCookies(
      context,
      "/login?error=" + encodeURIComponent("Unknown OAuth provider.")
    );
  }

  const redirectTo = new URL("/api/auth/callback", context.url.origin).toString();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });

  if (error || !data.url) {
    return redirectWithCookies(
      context,
      "/login?error=" + encodeURIComponent(
        error?.message ?? "OAuth initialisation failed. Please try again."
      )
    );
  }

  return redirectWithCookies(context, data.url);
}