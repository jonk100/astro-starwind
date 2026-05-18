/**
 * @file src/actions/auth.ts
 * @description Astro Actions for authentication.
 *
 * Registered in src/actions/index.ts under the `auth` key, making
 * them callable on the client as actions.auth.signIn, etc.
 *
 * @example
 * import { actions } from "astro:actions";
 *
 * const { data, error } = await actions.auth.signIn({
 *   email: "user@example.com",
 *   password: "password123",
 * });
 */

import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createClient } from "@/lib/supabase";

// ─── Shared Types ─────────────────────────────────────────────────────────────

/**
 * Standard success/failure response shape returned by all auth actions.
 * The client checks `success` first, then reads `message` for display.
 */
export interface AuthResult {
  success: boolean;
  message: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Maps Supabase error messages to user-friendly equivalents.
 * Supabase's own messages are generally safe to surface, but some are
 * cryptic or too technical for a login form. This normalises the worst ones.
 *
 * @param message - The raw error.message string from Supabase.
 * @returns A user-facing string suitable for display in the form.
 */
export function friendlyAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("invalid login credentials")) {
    return "Incorrect email or password.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email before signing in. Check your inbox.";
  }
  if (lower.includes("user already registered")) {
    return "An account with this email already exists. Try signing in.";
  }
  if (lower.includes("password should be at least")) {
    return "Password must be at least 6 characters.";
  }
  if (lower.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return "Network error. Check your connection and try again.";
  }

  // Fall back to the raw message — Supabase's defaults are reasonable.
  return message;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export const auth = {
  /**
   * Signs in an existing user with email and password.
   * Returns a success/failure result rather than throwing, so the
   * client can display inline form errors without a try/catch.
   *
   * @input email - The user's email address.
   * @input password - The user's password.
   */
  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("Please enter a valid email address.").trim(),
      password: z.string().min(1, "Password is required."),
    }),
    handler: async (input, context): Promise<AuthResult> => {
      const supabase = createClient(context);

      const { error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) {
        return {
          success: false,
          message: friendlyAuthError(error.message),
        };
      }

      return {
        success: true,
        message: "Signed in successfully.",
      };
    },
  }),

  /**
   * Registers a new user with email and password.
   * Sends a confirmation email — the user must verify before signing in.
   *
   * @input email - The user's email address.
   * @input password - The user's chosen password (min 6 characters).
   */
  signUp: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("Please enter a valid email address.").trim(),
      password: z.string().min(6, "Password must be at least 6 characters."),
    }),
    handler: async (input, context): Promise<AuthResult> => {
      const supabase = createClient(context);
      const origin = new URL(context.request.url).origin;
      const emailRedirectTo = `${origin}/auth/callback`;

      const { error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: { emailRedirectTo },
      });

      if (error) {
        return {
          success: false,
          message: friendlyAuthError(error.message),
        };
      }

      return {
        success: true,
        message: "Check your email to confirm your account.",
      };
    },
  }),

  /**
   * Signs out the current user and clears the session cookie.
   */
  signOut: defineAction({
    handler: async (_, context): Promise<AuthResult> => {
      const supabase = createClient(context);

      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          message: "Failed to sign out. Please try again.",
        };
      }

      return {
        success: true,
        message: "Signed out successfully.",
      };
    },
  }),
};