/**
 * SectionHeader variants
 * Defines layout intent rather than raw styles
 */

export const sectionHeaderVariants = {
  hero: {
    align: 'center',
    spacing: 'my-12 py-12',
    heading: 'xl',
    subheading: 'lg',
  },

  section: {
    align: 'center',
    spacing: 'my-6 py-6',
    heading: 'lg',
    subheading: 'md',
  },

  compact: {
    align: 'left',
    spacing: 'my-3 py-3',
    heading: 'sm',
    subheading: 'sm',
  },
} as const;

export type SectionHeaderVariant =
  keyof typeof sectionHeaderVariants;