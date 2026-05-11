import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Base ESLint recommended rules
  tseslint.configs.recommended,
  
  // Astro specific rules
  ...eslintPluginAstro.configs.recommended,
  
  {
    // Define which files these rules apply to
    files: ["**/*.ts", "**/*.tsx", "**/*.astro"],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      // Add custom overrides here
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
  {
    // Ignore build artifacts and cache
    ignores: ["dist/", ".astro/", "node_modules/"],
  }
);