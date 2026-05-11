/**
 * @file src/lib/supabase.ts
 * @description Shared Supabase client factory for server-side use in Astro.
 *
 * Uses the current @supabase/ssr API (getAll + setAll), which replaces the
 * deprecated three-method pattern (get, set, remove). Import and call
 * createClient() from any API route, middleware, or .astro page frontmatter
 * that runs on the server.
 *
 * Never import this file from a client-side <script> tag — it references
 * AstroCookies which only exists at request time on the server.
 *
 * Environment variables (.env):
 *   PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 *   PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
 *
 * Note: Supabase is migrating from PUBLIC_SUPABASE_ANON_KEY to
 * PUBLIC_SUPABASE_PUBLISHABLE_KEY. Both work during the transition —
 * use whichever your Supabase dashboard shows under API Keys.
 */

import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * The arguments createClient() needs to wire cookies to the Supabase client.
 * Pass the raw Request object and the Astro cookies store from your APIContext
 * or Astro.request / Astro.cookies in page frontmatter.
 */
interface CreateClientArgs {
  /** The incoming HTTP request, used to read the Cookie header. */
  request: Request;
  /**
   * Astro's cookie store, used to write session cookies back to the response.
   * In API routes this is `context.cookies`.
   * In .astro frontmatter this is `Astro.cookies`.
   */
  cookies: AstroCookies;
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Creates a Supabase server client configured to read and write session
 * cookies via Astro's request/response cycle.
 *
 * This is the single correct pattern for Astro + @supabase/ssr. The
 * getAll/setAll API is the non-deprecated replacement for the old
 * get/set/remove cookie methods.
 *
 * @example
 * // In an API route:
 * import { createClient } from "../../lib/supabase";
 *
 * export async function POST(context: APIContext) {
 *   const supabase = createClient(context);
 *   const { error } = await supabase.auth.signInWithPassword({ email, password });
 * }
 *
 * @example
 * // In .astro frontmatter:
 * import { createClient } from "../lib/supabase";
 *
 * const supabase = createClient({
 *   request: Astro.request,
 *   cookies: Astro.cookies,
 * });
 * const { data: { user } } = await supabase.auth.getUser();
 *
 * @param args - Object containing the request and cookies from the current context.
 * @returns A SupabaseClient instance ready for server-side auth operations.
 */
export function createClient({ request, cookies }: CreateClientArgs) {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;

  // Support both old (ANON_KEY) and new (PUBLISHABLE_KEY) env var names
  // during Supabase's transition period. PUBLISHABLE_KEY takes precedence.
  const supabaseKey =
    import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables.\n" +
      "Ensure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_PUBLISHABLE_KEY are set in .env"
    );
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      /**
       * @description Reads all cookies from the incoming request header.
       * parseCookieHeader() from @supabase/ssr converts the raw Cookie
       * string into the { name, value }[] array Supabase expects.
       */
      getAll() {
        // 1. Get the raw string from the headers
        const header = request.headers.get("Cookie") ?? "";
        
        // 2. Parse it into an array of { name, value }
        const parsed = parseCookieHeader(header);
        
        // 3. Map it to ensure 'value' is always a string (fixing the TS error)
        return parsed.map(c => ({
          name: c.name,
          value: c.value ?? ""
        }));
      },

      /**
       * @description Writes session cookies to the Astro response.
       * Called by Supabase after signIn, signOut, or token refresh.
       * Astro accumulates these on context.cookies and flushes them
       * to Set-Cookie headers when the response is sent.
       *
       * Cookie security options (httpOnly, secure, sameSite) are
       * passed through from Supabase's defaults, which are safe for
       * production use. The path is set explicitly to "/" so the
       * session cookie is sent on every request.
       *
       * @param cookiesToSet - Array of { name, value, options } from Supabase.
       */
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          // Use Astro's native cookies.set method
          cookies.set(name, value, {
            ...options,
            // Ensure path is always set — Supabase doesn't always include it.
            path: "/",
          })
        );
      },
    },
  });
}
