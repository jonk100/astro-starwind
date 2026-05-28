# re:MindMatters — Motion & Interaction Design Principles

## Core Motion Philosophy

Motion inside re:MindMatters is designed to be **somatic and breathing-paced**. 

It acts as a physical therapist for the nervous system, helping to:
- ease transitions between states
- reduce spatial disorientation
- capture attention with warm, slow-pulsing sparks rather than sharp flashes
- quieten the visual field during periods of deep writing and focus

Motion is never used for decorative embellishment. Every transition, fade, and expansion is calibrated to resemble biological rhythms, such as the gentle rise and fall of a deep, relaxing breath.

---

# Transition Easing & Timing

We prohibit bouncy, snappy, spring-based animations which mimic high-frequency physical impact. Instead, we use smooth, gradual, and progressive transitions.

## 1. The Breathing Curve (Custom Bezier)
- **Standard Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-smooth ease-out, slow deceleration).
- **Behavior**: Fast initial response, followed by a highly progressive and relaxing decelerated settling phase.

## 2. Timing Standards
- **UI Hover Highlights**: `150ms` duration.
- **Fade Transitions**: `300ms` duration.
- **Panel Slide-Ins (Gutter Widgets)**: `400ms` duration with progressive opacity changes.
- **Somatic Exercises (Breathing Guides)**: Up to `4000ms` loop duration to sync directly with physical inhalation, retention, and exhalation.

---

# Gutter Widgets Slide-In Dynamics

Our stacked right-gutter panels (`💡 Sparks`, `🎯 Habits`, `✉️ Mindful`) follow strict physical slide-in rules designed to keep the main notebook clean and organized:

```
[Screen Edge] ──> (Teaser Tab Displays) ──> [Hover/Click] ──> (Panel Slides Left)
                                                                 │
                                                             [Leaves]
                                                                 │
                                                          [3s Auto-Close]
                                                                 │
[Screen Edge] <── (Teaser Tab Displays) <────────────────────────┘
```

## 1. Initial Page-Load Slide-In (Sparks Panel)
- **Mechanism**: 2 seconds after the page loads, the Sparks/Prompts panel slides in from the right edge (`transform: translateX(0)` with opacity `1`) to welcome the user.
- **Auto-Recede**: If the user does not hover or click within 6 seconds, the panel recedes smoothly off-screen, leaving a small pulsing sparks teaser tab (`💡 Sparks`).

## 2. Gutter Panel Interactions
- **Hover/Click Activation**: Hovering or clicking a teaser tab slides its corresponding panel into view. 
- **Graceful Auto-Close**: When the mouse leaves an active panel, a **3-second countdown** is initiated. If no interaction occurs within 3 seconds, the panel recedes off-screen and returns focus to the main note.
- **Mutual Exclusion**: Opening any gutter widget immediately fires a `tiptop:prompts-opened` event that closes all other active panels, preventing visual crowding in the margins.
- **Game Lockdown**: If the user is actively playing the Word Challenge or writing in Danger Mode, the auto-close timers are **strictly frozen** to prevent the panel from sliding away mid-flow.

---

# Ergonomic Typing Flow Motion

## 1. Typewriter Vertical Auto-Centering
- **Trigger**: When the user presses `Enter` to start a new paragraph in the Editor.
- **Motion**: The editor canvas scroll-parent (`#write-canvas-wrapper`) performs a **smooth, sub-second vertical scroll** (`behavior: 'smooth'`) to center the new cursor line precisely in the middle of the screen viewport.
- **Benefit**: Prevents the writer from looking down at the bottom of the screen, reducing neck strain and establishing a centered, forward-looking focal point.

## 2. Danger Mode Somatic Alerts
- **Warning State**: If the user pauses writing for more than 2.5 seconds while in Danger Mode, a vignette overlay fades in with a slow, heart-beat pulsing red glow (`rgba(220, 58, 104, 0.4)`).
- **The Wiggle**: The entire notebook container (`.tiptop-shell`) begins a subtle, low-frequency somatic wiggle (`.editor-shake` class) to gently nudge the writer's focus back into typing flow, without inducing panic or stress.
- **Recovery**: Typing a single character instantly vanishes the red glow and stops the notebook wiggle with a `150ms` transition.
