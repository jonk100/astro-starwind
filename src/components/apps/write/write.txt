Architecture for this app should prioritize four things:

1. Instant-feeling editing
2. Flat indexed retrieval
3. Minimal cognitive load
4. Beautiful writing atmosphere

Your existing Astro Actions + Supabase setup is already very close to ideal for this.

Recommended product structure:

---

# Core Concept

Think:

* Notion editing feel
* Obsidian organization speed
* IA Writer writing atmosphere
* without complexity

The app should feel like:

* a calm fullscreen writing environment
* with subtle structured blocks
* but fundamentally text-first

Not a database pretending to be a document editor.

---

# Recommended Data Model

Avoid deeply nested block trees.

Use:

## documents

```sql
documents
- id
- user_id
- title
- slug
- folder_id
- preview
- content_json
- created_at
- updated_at
- archived_at
- pinned
```

## folders

```sql
folders
- id
- user_id
- name
- parent_id
- sort_order
```

## document_index

Flat searchable index.

```sql
document_index
- document_id
- user_id
- title
- preview
- plain_text
- updated_at
```

This gives:

* fast sidebar rendering
* fast search
* easy ranking
* no recursive hydration nightmares

The sidebar should NEVER load full documents.

Only:

* id
* title
* preview
* updated_at
* folder

---

# Editor Philosophy

Do not build full Notion.

Only support blocks where they materially improve writing.

Recommended blocks:

| Block     | Why                          |
| --------- | ---------------------------- |
| paragraph | primary                      |
| heading   | structure                    |
| quote     | beautiful prose              |
| separator | pacing                       |
| image     | optional                     |
| checklist | lightweight tasks            |
| callout   | notes/thoughts               |
| code      | optional                     |
| prompt    | creative-writing inspiration |

Do NOT implement:

* databases
* embeds
* synced blocks
* infinite slash commands
* nested toggles everywhere

---

# Recommended UI Layout

```txt
┌───────────────────────────────┬────────────────────────────┐
│ Sidebar                      │ Toolbar                    │
│                               │────────────────────────────│
│ Search                        │                            │
│                               │                            │
│ Folders                       │       Writing Canvas       │
│                               │                            │
│ Recent Docs                   │                            │
│                               │                            │
│ Pinned                        │                            │
│                               │                            │
└───────────────────────────────┴────────────────────────────┘
```

---

# Writing Canvas

The canvas is the product.

Make it cinematic.

## Visual ideas

* soft gradients
* enormous whitespace
* subtle texture
* floating centered column
* large line-height
* animated caret glow
* smooth typography transitions
* dimmed chrome while typing

Think:

* “late-night novelist software”
* not “enterprise workspace”

---

# Toolbar

Minimal.

```txt
[ Search ]
[ New ]
[ Folder ]
[ Prompt ]
--------------------------------
H1
Quote
Checklist
Divider
Focus Mode
Theme
```

No ribbon UI.

No Google Docs chaos.

---

# Writing Prompts

This is a huge differentiator.

Prompts should:

* appear softly
* not interrupt writing
* rotate optionally
* feel literary

Examples:

> “Write the argument you wish someone had made for you.”

> “What changed quietly?”

> “Describe the room after everyone left.”

> “What truth becomes obvious at 3AM?”

---

# Prompt System Architecture

## prompts.ts

```ts
export interface WritingPrompt {
  id: string;
  category: string;
  text: string;
}

export const prompts: WritingPrompt[] = [];
```

## PromptOverlay.astro

Subtle fade overlay.

Dismissible.

Keyboard shortcut:

```txt
CMD + /
```

for new prompt.

---

# Storage Strategy

Critical:
documents should autosave aggressively.

Recommended:

```txt
250ms debounce
```

using Astro Actions.

---

# Astro Actions Strategy

Your current action structure is excellent.

Mirror it:

```txt
actions/
  journal.ts
```

Actions:

```ts
journal.create
journal.update
journal.delete
journal.move
journal.search
journal.createFolder
```

---

# Content Format

Do NOT store HTML.

Store JSON blocks.

Example:

```json
[
  {
    "id": "1",
    "type": "heading",
    "content": "Chapter One"
  },
  {
    "id": "2",
    "type": "paragraph",
    "content": "The rain had stopped..."
  }
]
```

Then render blocks via Astro components.

This keeps:

* portability
* indexing
* future AI tooling
* export capability

---

# Fast Rendering Strategy

Hydrate only:

* active editor
* sidebar search
* toolbar

Everything else:
server-rendered Astro.

---

# Suggested File Structure

```txt
src/
  components/
    apps/
      journal/

        editor/
          EditorCanvas.astro
          editorCanvas.css
          editorCanvas.ts
          EditorCanvas.types.ts

          blocks/
            ParagraphBlock.astro
            HeadingBlock.astro
            QuoteBlock.astro
            PromptBlock.astro

        sidebar/
          JournalSidebar.astro
          FolderTree.astro
          DocumentList.astro

        toolbar/
          JournalToolbar.astro

        prompts/
          PromptOverlay.astro
          prompts.ts

  actions/
    journal.ts

  lib/
    journal/
      queries.ts
      mutations.ts
      editor.ts
      indexing.ts
      types.ts
```

---

# Recommended Editing Model

Avoid contenteditable chaos everywhere.

Preferred approach:

* one contenteditable region per block
* block IDs stable
* keyboard-driven block transforms
* optimistic client state
* debounced persistence

---

# Best “Notion-lite” Interactions

Only include:

* `/quote`
* `/h1`
* `/check`
* `/divider`

That’s enough.

---

# Important Performance Decision

DO NOT:

* fully serialize the whole editor on every keystroke

Instead:

* patch only changed blocks

Example:

```ts
journal.updateBlock({
  document_id,
  block_id,
  content,
});
```

This is vastly faster.

---

# Suggested Database Extras

## document_versions

For restore/history.

```sql
document_versions
- id
- document_id
- snapshot
- created_at
```

## document_tags

Optional lightweight organization.

---

# UX Features Worth Building

High value:

* focus mode
* typewriter mode
* beautiful typography themes
* keyboard navigation
* instant search
* backlinks later

Low value:

* collaborative editing initially
* realtime cursors
* giant plugin system

---

# Typography Recommendations

Use:

* serif body option
* huge readable spacing
* max-width around 70ch
* oversized headings
* subtle motion

This app should feel emotionally calming.

---

# Best Technical Stack For Your Preferences

You specifically should use:

* Astro
* Astro Actions
* Supabase
* vanilla TypeScript
* Tailwind
* isolated client islands only

Avoid:

* React editors
* Tiptap
* Slate
* Lexical
* ProseMirror initially

They become architecture black holes fast.

Your preferences and current codebase are actually well-suited to a handcrafted editor.
