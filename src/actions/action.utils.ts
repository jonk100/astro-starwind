import { createClient } from "@/lib/supabase";
import { defineAction, ActionError } from "astro:actions";

/**
 * Retrieves the authenticated user from the current Supabase session.
 * Throws an UNAUTHORIZED ActionError if no session is found.
 *
 * @param context - The Astro action handler context.
 * @returns The authenticated Supabase user object and a ready supabase client.
 * @throws {ActionError} UNAUTHORIZED if the user is not logged in.
 */
export async function getAuthenticatedUser(
  context: Parameters<Parameters<typeof defineAction>[0]["handler"]>[1]
) {
  const supabase = createClient({
    request: context.request,
    cookies: context.cookies,
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action.",
    });
  }

  return { supabase, user };
}