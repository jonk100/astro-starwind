/**
 * @file src/pages/api/auth/change-password.ts
 * @description Changes user password after validating current password.
 */

export const prerender = false;

import type { APIContext } from "astro";
import { createClient } from "@/lib/supabase";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const { currentPassword, newPassword } = await context.request.json();
    
    if (!currentPassword || !newPassword) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Current password and new password are required" 
        }),
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Password must be at least 6 characters long" 
        }),
        { status: 400 }
      );
    }

    const supabase = createClient(context);
    
    // Verify current password by signing in with it
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: context.locals.user?.email || '',
      password: currentPassword,
    });

    if (signInError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Current password is incorrect" 
        }),
        { status: 400 }
      );
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to update password" 
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Password updated successfully" 
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Change password error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Internal server error" 
      }),
      { status: 500 }
    );
  }
}
