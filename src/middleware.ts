import { defineMiddleware } from "astro:middleware";
import { createClient } from "@/lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, locals, redirect } = context;
  const supabase = createClient({
    request: context.request,
    cookies: context.cookies
  });

  // 1. Update the session (This refreshes the token if needed)
  // Essential for SSR!
  const { data: { user } } = await supabase.auth.getUser();
  
  // 2. Attach user to locals so you can use Astro.locals.user in any page
  locals.user = user;

  // 3. Define your protected/public routes
  const isProtectedPath = url.pathname.startsWith("/app");
  const isAuthPath = ["/login", "/signup", "/auth/login", "/auth/signup"].includes(
    url.pathname
  );

  // 4. Guard Logic
  if (isProtectedPath && !user) {
    // Save the intended destination to redirect back after login
    const dest = `${url.pathname}${url.search}`;
    return redirect(`/auth/login?next=${encodeURIComponent(dest)}`);
  }

  if (isAuthPath && user) {
    // If logged in, don't let them go back to the login page
    return redirect("/app/habit/month-tracker");
  }

  return next();
});