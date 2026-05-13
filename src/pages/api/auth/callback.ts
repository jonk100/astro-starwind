/**
 * @file src/pages/api/auth/callback.ts
 * @description OAuth callback handler. Exchanges the short-lived `code`
 * param Supabase sends after OAuth authorisation for a full session,
 * writes the session cookies, then redirects into the app.
 *
 * The URL /api/auth/callback must be registered in:
 *   - Supabase dashboard → Authentication → URL Configuration → Redirect URLs
 *   - Your OAuth provider's app settings (e.g. GitHub → OAuth App → Callback URL)
 */

import type { APIContext } from "astro";
import { createClient } from "@/lib/supabase";

export const prerender = false;

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return "/";
  }
}

/**
 * Exchanges the OAuth authorisation code for a Supabase session.
 *
 * @param context - Astro API context.
 * @returns A redirect Response with session cookies set on success.
 */
export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get("code");
  const next = safeDecodeURIComponent(context.url.searchParams.get("next") || "/");

  if (!code) {
    return Response.redirect(
      new URL(
        "/auth/login?error=" + encodeURIComponent("OAuth sign-in was cancelled or failed."),
        context.url.origin
      ),
      302
    );
  }

  const supabase = createClient(context);
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  const headers = new Headers();

  for (const cookie of context.cookies.headers()) {
    headers.append("Set-Cookie", cookie);
  }

  headers.set(
    "Location",
    error
      ? "/auth/login?error=" + encodeURIComponent(error.message)
      : next
  );

  return new Response(null, { status: 302, headers });
}
