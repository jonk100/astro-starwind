/**
 * @file src/lib/habit/theme.ts
 * @description Dynamic theme coloring utilities for habits.
 * Maps habit IDs to 5 modern premium color presets using CSS variables
 * for maximum build reliability and robust custom styling.
 */

export interface HabitTheme {
  id: string;
  name: string;
  primaryColor: string; // RGB tuple e.g. "16, 185, 129"
  lightBg: string;      // RGB tuple e.g. "240, 253, 250"
}

export const HABIT_THEMES: HabitTheme[] = [
  {
    id: "emerald",
    name: "Mindfulness",
    primaryColor: "16, 185, 129", // Emerald 500
    lightBg: "240, 253, 250",      // Emerald 50
  },
  {
    id: "rose",
    name: "Energy",
    primaryColor: "244, 63, 94",  // Rose 500
    lightBg: "255, 241, 242",     // Rose 50
  },
  {
    id: "violet",
    name: "Focus",
    primaryColor: "139, 92, 246", // Violet 500
    lightBg: "245, 243, 255",     // Violet 50
  },
  {
    id: "amber",
    name: "Vitality",
    primaryColor: "245, 158, 11",  // Amber 500
    lightBg: "254, 252, 232",     // Amber 50
  },
  {
    id: "sky",
    name: "Flow",
    primaryColor: "14, 165, 233",  // Sky 500
    lightBg: "240, 249, 255",     // Sky 50
  },
];

function hexToRgb(hex: string): { rgb: string; lightBg: string } {
  // Strip '#' if present
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  
  // Calculate light background by mixing with white (94%)
  const lr = Math.round(r + (255 - r) * 0.94);
  const lg = Math.round(g + (255 - g) * 0.94);
  const lb = Math.round(b + (255 - b) * 0.94);
  
  return {
    rgb: `${r}, ${g}, ${b}`,
    lightBg: `${lr}, ${lg}, ${lb}`
  };
}

/**
 * Returns a stable HabitTheme for a given habit ID using a basic string hashing algorithm.
 * If a custom color theme is present in the habit's metadata, it is used instead.
 *
 * @param habitId - The database UUID of the habit.
 * @param metadata - The metadata JSON field associated with the habit.
 * @returns The assigned HabitTheme.
 */
export function getHabitTheme(habitId: string, metadata?: any): HabitTheme {
  // Check if a custom theme choice is saved in the metadata
  if (metadata && typeof metadata === "object") {
    const customThemeId = metadata.themeId || metadata.color;
    if (customThemeId) {
      const match = HABIT_THEMES.find(t => t.id === customThemeId);
      if (match) return match;

      // Handle custom hex colors dynamically!
      if (customThemeId.startsWith("#")) {
        const parsed = hexToRgb(customThemeId);
        return {
          id: customThemeId,
          name: "Custom",
          primaryColor: parsed.rgb,
          lightBg: parsed.lightBg
        };
      }
    }
  }

  // Fallback to stable string hashing based on habit ID
  if (!habitId) return HABIT_THEMES[0];
  
  let hash = 0;
  for (let i = 0; i < habitId.length; i++) {
    hash = habitId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % HABIT_THEMES.length;
  return HABIT_THEMES[index];
}
