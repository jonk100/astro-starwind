/**
 * @file src/pages/api/auth/logout.ts
 * @description Signs the user out and clears session cookies.
 *
 * Call via a form POST from any page:
 *   <form method="POST" action="/api/auth/logout">
 *     <button type="submit">Sign out</button>
 *   </form>
 */

import type { APIContext } from "astro";
import { createClient } from "@/lib/supabase";

export const prerender = false;

/**
 * Signs the current user out by calling supabase.auth.signOut(),
 * which triggers setAll() with expired cookie values to clear them
 * from the browser. Then redirects to /login.
 *
 * @param context - Astro API context.
 * @returns A redirect to /login with cleared session cookies.
 */
export async function POST(context: APIContext): Promise<Response> {
  const supabase = createClient(context);
  await supabase.auth.signOut();

  const headers = new Headers({ Location: "/auth/login" });

  for (const cookie of context.cookies.headers()) {
    headers.append("Set-Cookie", cookie);
  }

  return new Response(null, { status: 302, headers });
}
