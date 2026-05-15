/**
 * Shared category / tag colour theme utility.
 *
 * A single source of truth for gradients so that category pills,
 * card headers, and tinted backgrounds always match, wherever they appear.
 *
 * Usage:
 *   import { getCategoryTheme } from '@/components/blog/shared/categoryColors';
 *   const theme = getCategoryTheme('Mental Health');
 *   // theme.headerStyle  → inline style string (gradient bg, white text)
 *   // theme.pillStyle    → same + border-color
 *   // theme.accentColor  → single CSS colour for icons / labels
 *   // theme.tintRgb      → "r,g,b" for rgba(tintRgb, 0.08) washes
 */

export type CategoryTheme = {
  /** Ready-made `style` attribute value: gradient background + white text. */
  headerStyle: string;
  /** Same as headerStyle but also sets `border-color` for outlined pill buttons. */
  pillStyle: string;
  /** Primary hex colour for accent text (e.g. "LATEST" label). */
  accentColor: string;
  /**
   * Comma-separated R, G, B integers with no alpha channel.
   * Combine like: `rgba(${tintRgb}, 0.08)` for subtle background washes.
   */
  tintRgb: string;
};

// ─── helpers ────────────────────────────────────────────────────────────────

function make(from: string, to: string, rgb: string): CategoryTheme {
  const grad = `linear-gradient(135deg, ${from}, ${to})`;
  return {
    headerStyle: `background: ${grad}; color: white;`,
    pillStyle:   `background: ${grad}; color: white; border-color: ${from};`,
    accentColor: from,
    tintRgb:     rgb,
  };
}

// ─── colour map (most-specific first) ───────────────────────────────────────

/**
 * Each entry is [regex, theme]. The regex is tested against the
 * lowercased category / tag name. First match wins.
 */
const ENTRIES: Array<[RegExp, CategoryTheme]> = [
  // Crisis
  [/crisis|emergency/i,                   make('#ef4444', '#dc2626', '239,68,68')],

  // Emotional Intelligence (before "emotional well-being")
  [/emotional intelligence/i,             make('#ec4899', '#be185d', '236,72,153')],

  // Emotional Well-Being / Well-being
  [/emotional well/i,                     make('#8b5cf6', '#7c3aed', '139,92,246')],

  // Mental Health + Lifestyle OR Basics (before plain "mental health")
  [/mental health.*(lifestyle|basics)/i,  make('#06b6d4', '#0891b2', '6,182,212')],

  // Music & Mental Health (before plain "mental health")
  [/music.*mental|mental.*music/i,        make('#a855f7', '#9333ea', '168,85,247')],

  // Plain Mental Health
  [/mental health/i,                      make('#3b82f6', '#1d4ed8', '59,130,246')],

  // Personal Development / Growth
  [/personal (growth|development)/i,      make('#10b981', '#059669', '16,185,129')],

  // Relationships / Communication
  [/relationships|communication/i,        make('#f59e0b', '#d97706', '245,158,11')],

  // Self-Care
  [/self[-\s]care/i,                      make('#c026d3', '#9333ea', '192,38,211')],

  // Therapies / Treatments
  [/therapies|treatment/i,                make('#0ea5e9', '#0284c7', '14,165,233')],

  // Work-Life Balance
  [/work[-\s]life/i,                      make('#84cc16', '#65a30d', '132,204,22')],

  // Mindfulness / Meditation
  [/mindfulness|meditation/i,             make('#10b981', '#059669', '16,185,129')],

  // Anxiety / Panic
  [/anxiety|panic/i,                      make('#ef4444', '#ec4899', '239,68,68')],

  // Stress
  [/stress/i,                             make('#f59e0b', '#ea580c', '245,158,11')],

  // Sleep
  [/sleep/i,                              make('#3b82f6', '#6366f1', '59,130,246')],

  // Well-being (general, after more specific patterns)
  [/well[-\s]being/i,                     make('#14b8a6', '#0d9488', '20,184,166')],

  // Educational / Cognitive
  [/educational|cognitive/i,              make('#06b6d4', '#0284c7', '6,182,212')],
];

const DEFAULT_THEME = make('#6b7280', '#4b5563', '107,114,128');

// ─── public API ─────────────────────────────────────────────────────────────

/**
 * Look up the colour theme for any category or tag name.
 * The input is normalised to lowercase before matching.
 */
export function getCategoryTheme(name: string): CategoryTheme {
  const lower = name.toLowerCase();
  for (const [pattern, theme] of ENTRIES) {
    if (pattern.test(lower)) return theme;
  }
  return DEFAULT_THEME;
}
