import { defineConfig, fontProviders } from 'astro/config';
import astroConsent from "astro-consent";
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  
  // Required for Astro Actions, Supabase Auth, and dynamic server-side logic
  output: 'server', 

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    runtime: {
      mode: 'transformed', // Switch from 'directory' to 'transformed'
      binding: {
        nodejs_compat: true
      }
    }
  }),

  integrations: [
    astroConsent({
      siteName: "re:MindMatters",
      headline: "The Cookie Monster Has Come.",
      description: "If we don't give him our cookies, he'll think of some even weirder shit to do to us. What a world.",
      acceptLabel: "Accept all",
      rejectLabel: "Reject all",
      manageLabel: "Manage preferences",
      cookiePolicy: {
        url: '/legal/cookies',
        label: 'Cookie Policy',
      },
      privacyPolicyUrl: "/privacy",
      displayUntilIdle: true,
      displayIdleDelayMs: 1000,
      consent: {
        days: 30,
        storageKey: "astro-consent"
      }
    }),
    mdx(),
    sitemap(),
    // aao()
  ],

  image: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      path: '/**'
    }],
    // Removed explicit Sharp entrypoint to avoid Node.js binary conflicts on Cloudflare.
    // Cloudflare will use its own optimized image service automatically.
    dangerouslyProcessSVG: true
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],  
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],

    define: {
      'process.env': {},
    },

    resolve: {
      conditions: [
        'workerd',
        'worker',
        'browser',
        'module',   // ← add this: many packages use "module" to expose ESM
        'import',
      ],
    },

    ssr: {
      noExternal: [
        // astro-cloudinary and its dep chain — these need to be bundled
        // so Vite can transpile their CJS require() calls away
        'astro-cloudinary',
        '@unpic/astro',
        '@unpic/pixels',

        // Keep cloudinary OUT of noExternal — let Vite externalize it
        // and handle it via the optimizeDeps.include below instead.
        // 'cloudinary',  ← remove this line

        'astro-consent',
        'astro-agent-optimised',
        '@supabase/ssr',
        '@supabase/supabase-js',
        'clsx',
        'tailwind-merge',
      ],

      // Explicitly externalize the Node SDK — workerd cannot run it at all.
      // astro-cloudinary should only call cloudinary server-side at build time,
      // or via fetch-based API calls, not by importing the Node SDK in the worker.
      external: [
        'cloudinary',
      ],
    },

    optimizeDeps: {
      // Force Vite to pre-bundle these as ESM during dev
      include: [
        'astro-cloudinary',
        'embla-carousel',
      ],
      exclude: ['@cloudflare/workerd-linux-64'],
    },
  },
});