// ─── Shared types ─────────────────────────────────────────────────────────────

/**
 * Standard success response shape returned by all auth actions.
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