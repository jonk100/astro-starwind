/**
 * Reusable tag color mapping system.
 * 
 * Maps all 33 canonical tags to a detailed, distinguishable color spectrum of organic Tailwind styles,
 * while maintaining taxonomy coherence (e.g. Topics, Conditions, Techniques, Metas share distinct color ranges).
 */

/**
 * Returns a cohesive set of Tailwind classes for border, text, background, and hover states
 * based on the specified canonical tag.
 * 
 * @param {string} tag - The canonical tag name to color-code.
 * @returns {string} Tailwind utility classes for the tag badge/pill.
 */
export function getTagColorClass(tag: string): string {
  const normalized = tag.toLowerCase().trim();

  // 1. TOPICS (VISUAL RANGE: SAGE, GREEN, EMERALD, BLUE, SKY, INDIGO, PINK, LIME)
  switch (normalized) {
    case 'mental-health':
      return 'border-emerald-600/20 text-emerald-800 bg-emerald-600/5 hover:bg-emerald-600/10 dark:border-emerald-600/30 dark:text-emerald-400 dark:bg-emerald-600/10';
    case 'self-care':
      return 'border-teal-500/20 text-teal-700 bg-teal-500/5 hover:bg-teal-500/10 dark:border-teal-500/30 dark:text-teal-400 dark:bg-teal-500/10';
    case 'mindfulness':
      return 'border-emerald-500/20 text-emerald-700 bg-emerald-500/5 hover:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/10';
    case 'relationships':
      return 'border-amber-500/20 text-amber-700 bg-amber-500/5 hover:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400 dark:bg-amber-500/10';
    case 'personal-growth':
      return 'border-indigo-600/20 text-indigo-700 bg-indigo-600/5 hover:bg-indigo-600/10 dark:border-indigo-600/30 dark:text-indigo-400 dark:bg-indigo-600/10';
    case 'stress-management':
      return 'border-orange-500/20 text-orange-700 bg-orange-500/5 hover:bg-orange-500/10 dark:border-orange-500/30 dark:text-orange-400 dark:bg-orange-500/10';
    case 'nutrition':
      return 'border-lime-600/20 text-lime-700 bg-lime-600/5 hover:bg-lime-600/10 dark:border-lime-600/30 dark:text-lime-400 dark:bg-lime-600/10';
    case 'sleep':
      return 'border-violet-600/20 text-violet-700 bg-violet-600/5 hover:bg-violet-600/10 dark:border-violet-600/30 dark:text-violet-400 dark:bg-violet-600/10';
    case 'exercise':
      return 'border-cyan-600/20 text-cyan-700 bg-cyan-600/5 hover:bg-cyan-600/10 dark:border-cyan-600/30 dark:text-cyan-400 dark:bg-cyan-600/10';
    case 'therapy':
      return 'border-sky-600/20 text-sky-700 bg-sky-600/5 hover:bg-sky-600/10 dark:border-sky-600/30 dark:text-sky-400 dark:bg-sky-600/10';
    case 'trauma':
      return 'border-rose-600/20 text-rose-700 bg-rose-600/5 hover:bg-rose-600/10 dark:border-rose-600/30 dark:text-rose-400 dark:bg-rose-600/10';
    case 'social-media':
      return 'border-blue-600/20 text-blue-700 bg-blue-600/5 hover:bg-blue-600/10 dark:border-blue-600/30 dark:text-blue-400 dark:bg-blue-600/10';
    case 'grief':
      return 'border-fuchsia-600/20 text-fuchsia-700 bg-fuchsia-600/5 hover:bg-fuchsia-600/10 dark:border-fuchsia-600/30 dark:text-fuchsia-400 dark:bg-fuchsia-600/10';
    case 'resilience':
      return 'border-purple-600/20 text-purple-700 bg-purple-600/5 hover:bg-purple-600/10 dark:border-purple-600/30 dark:text-purple-400 dark:bg-purple-600/10';
    case 'communication':
      return 'border-pink-600/20 text-pink-700 bg-pink-600/5 hover:bg-pink-600/10 dark:border-pink-600/30 dark:text-pink-400 dark:bg-pink-600/10';

    // 2. CONDITIONS (VISUAL RANGE: RED, ORANGE, CHARCOAL, ROSE, CRIMSON)
    case 'anxiety':
      return 'border-red-500/20 text-red-700 bg-red-500/5 hover:bg-red-500/10 dark:border-red-500/30 dark:text-red-400 dark:bg-red-500/10';
    case 'burnout':
      return 'border-amber-600/20 text-amber-700 bg-amber-600/5 hover:bg-amber-600/10 dark:border-amber-600/30 dark:text-amber-400 dark:bg-amber-600/10';
    case 'depression':
      return 'border-slate-500/20 text-slate-700 bg-slate-500/5 hover:bg-slate-500/10 dark:border-slate-500/30 dark:text-slate-400 dark:bg-slate-500/10';
    case 'stress':
      return 'border-yellow-600/20 text-yellow-700 bg-yellow-600/5 hover:bg-yellow-600/10 dark:border-yellow-600/30 dark:text-yellow-400 dark:bg-yellow-600/10';
    case 'post-traumatic-stress-disorder':
      return 'border-red-700/20 text-red-800 bg-red-700/5 hover:bg-red-700/10 dark:border-red-700/30 dark:text-red-300 dark:bg-red-700/10';
    case 'social-anxiety':
      return 'border-rose-500/20 text-rose-700 bg-rose-500/5 hover:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400 dark:bg-rose-500/10';
    case 'seasonal-affective-disorder':
      return 'border-orange-600/20 text-orange-800 bg-orange-600/5 hover:bg-orange-600/10 dark:border-orange-600/30 dark:text-orange-300 dark:bg-orange-600/10';
    case 'negative-thought-patterns':
      return 'border-stone-600/20 text-stone-700 bg-stone-600/5 hover:bg-stone-600/10 dark:border-stone-600/30 dark:text-stone-400 dark:bg-stone-600/10';

    // 3. TECHNIQUES (VISUAL RANGE: EMERALD, PURPLE, INDIGO, AMBER, VIOLET, LIME, PINK)
    case 'meditation':
      return 'border-teal-600/20 text-teal-800 bg-teal-600/5 hover:bg-teal-600/10 dark:border-teal-600/30 dark:text-teal-300 dark:bg-teal-600/10';
    case 'journaling':
      return 'border-purple-500/20 text-purple-700 bg-purple-500/5 hover:bg-purple-500/10 dark:border-purple-500/30 dark:text-purple-400 dark:bg-purple-500/10';
    case 'gratitude':
      return 'border-yellow-500/20 text-yellow-600 bg-yellow-500/5 hover:bg-yellow-500/10 dark:border-yellow-500/30 dark:text-yellow-400 dark:bg-yellow-500/10';
    case 'breathing-exercises':
      return 'border-cyan-500/20 text-cyan-600 bg-cyan-500/5 hover:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-400 dark:bg-cyan-500/10';
    case 'grounding-techniques':
      return 'border-orange-700/20 text-orange-700 bg-orange-700/5 hover:bg-orange-700/10 dark:border-orange-700/30 dark:text-orange-400 dark:bg-orange-700/10';
    case 'goal-setting':
      return 'border-emerald-400/20 text-emerald-600 bg-emerald-400/5 hover:bg-emerald-400/10 dark:border-emerald-400/30 dark:text-emerald-400 dark:bg-emerald-400/10';
    case 'cognitive-restructuring':
      return 'border-sky-500/20 text-sky-600 bg-sky-500/5 hover:bg-sky-500/10 dark:border-sky-500/30 dark:text-sky-400 dark:bg-sky-500/10';
    case 'boundary-setting':
      return 'border-red-600/20 text-red-600 bg-red-600/5 hover:bg-red-600/10 dark:border-red-600/30 dark:text-red-400 dark:bg-red-600/10';
    case 'mindful-eating':
      return 'border-lime-500/20 text-lime-600 bg-lime-500/5 hover:bg-lime-500/10 dark:border-lime-500/30 dark:text-lime-400 dark:bg-lime-500/10';
    case 'self-compassion':
      return 'border-pink-500/20 text-pink-600 bg-pink-500/5 hover:bg-pink-500/10 dark:border-pink-500/30 dark:text-pink-400 dark:bg-pink-500/10';
    case 'emotional-regulation':
      return 'border-violet-500/20 text-violet-600 bg-violet-500/5 hover:bg-violet-500/10 dark:border-violet-500/30 dark:text-violet-400 dark:bg-violet-500/10';
    case 'art-therapy':
      return 'border-fuchsia-500/20 text-fuchsia-600 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 dark:border-fuchsia-500/30 dark:text-fuchsia-400 dark:bg-fuchsia-500/10';

    // 4. METAS & FORMATS (VISUAL RANGE: SLATE WITH MINIMAL ACCENT HUES)
    case 'song-sunday':
      return 'border-rose-400/20 text-rose-500 bg-rose-400/5 hover:bg-rose-400/10 dark:border-rose-400/30 dark:text-rose-400 dark:bg-rose-400/10';
    case 'guide':
      return 'border-stone-500/20 text-stone-500 bg-stone-500/5 hover:bg-stone-500/10 dark:border-stone-500/30 dark:text-stone-400 dark:bg-stone-500/10';
    case 'explainer':
      return 'border-blue-400/20 text-blue-500 bg-blue-400/5 hover:bg-blue-400/10 dark:border-blue-400/30 dark:text-blue-400 dark:bg-blue-400/10';
    case 'research':
      return 'border-amber-400/20 text-amber-500 bg-amber-400/5 hover:bg-amber-400/10 dark:border-amber-400/30 dark:text-amber-400 dark:bg-amber-400/10';
    case 'case-study':
      return 'border-indigo-400/20 text-indigo-500 bg-indigo-400/5 hover:bg-indigo-400/10 dark:border-indigo-400/30 dark:text-indigo-400 dark:bg-indigo-400/10';

    default:
      return 'border-border text-muted-foreground bg-muted/40 hover:bg-muted hover:border-stone-300 dark:hover:border-stone-700';
  }
}
