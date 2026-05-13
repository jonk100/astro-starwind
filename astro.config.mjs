import { defineConfig, fontProviders } from 'astro/config';
import astroConsent from "astro-consent";
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  adapter: netlify({
    cacheOnDemandPages: true,
  }),
  integrations: [
    starlight({
      title: 'My delightful docs site',
    }),
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
  ],

  image: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      path: '/**'
    }],
    
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],

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
    
  },
});