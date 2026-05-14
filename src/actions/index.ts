/**
 * @file src/actions/index.ts
 */

import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { createClient } from "@/lib/supabase"; // Use your new centralized factory
import { friendlyAuthError } from './auth.ts';
import type { AuthResult } from './auth.ts';

export const server = {
  // ============================================================
  // AUTHENTICATION OPERATIONS ==================================
  // ============================================================

  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("Please enter a valid email address.").trim(),
      password: z.string().min(1, "Password is required."),
    }),
    handler: async (input, context): Promise<AuthResult> => {
      // Use the centralized factory passing the Action context
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

  // ============================================================
  // DATABASE OPERATIONS ========================================
  // ============================================================

  updateHabit: defineAction({
    input: z.object({
      habitId: z.string().uuid(),
      date: z.string(), 
      val: z.number()
    }),
    handler: async (input, context) => {
      const supabase = createClient(context);

      // 1. Get the authenticated user from the session
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Unauthorized: You must be logged in to update habits.");
      }

      // 2. Perform the UPSERT with the user_id
      const { error } = await supabase
        .from('habit_logs')
        .upsert({ 
          habit_id: input.habitId, 
          entry_date: input.date, 
          value: input.val,
          user_id: user.id // Essential for RLS
        }, { 
          // Match the unique index we created earlier
          onConflict: 'user_id,habit_id,entry_date' 
        });

      if (error) throw new Error(error.message);
      
      return { success: true };
    }
  })
};