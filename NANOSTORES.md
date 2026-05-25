# NanoStores Guide for This Project

**NanoStores** is a minimal, framework-agnostic state management library. Perfect for Astro because it's tiny (~2KB), has excellent TypeScript support, and works great with client islands.

## Why NanoStores?

- Simple atoms + maps + computed values
- No boilerplate (no reducers, no dispatch)
- Excellent for Astro (SSR + islands)
- Great for your editor (real-time blocks, title, dirty state)
- Easy to test

---

## Project Structure

```bash
src/
  stores/
    editor.ts          # Main writing canvas state
    journal.ts         # Sidebar, documents index, search
    habits.ts          # Habit tracker state
    ui.ts              # Global UI (sidebar open, focus mode, theme)
    prompts.ts         # Writing prompts
```

---

## Core Concepts + Examples

### 1. Basic Atom (Simple primitive state)

```ts
// src/stores/ui.ts
import { atom } from 'nanostores';

export const sidebarOpen = atom(true);
export const focusMode = atom(false);
export const isTyping = atom(false); // for dimming chrome
```

**Usage in island:**

```astro
<script>
  import { sidebarOpen } from '@/stores/ui';

  sidebarOpen.subscribe((open) => {
    document.getElementById('sidebar')?.classList.toggle('hidden', !open);
  });

  // Toggle
  function toggleSidebar() {
    sidebarOpen.set(!sidebarOpen.get());
  }
</script>
```

---

### 2. Map Store (Object with multiple fields)

Best for your **Editor**.

```ts
// src/stores/editor.ts
import { map, action, computed } from 'nanostores';
import type { Block } from '@/lib/journal/types';

interface EditorState {
  documentId: string | null;
  title: string;
  blocks: Block[];
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
  wordCount: number;
}

export const editor = map<EditorState>({
  documentId: null,
  title: '',
  blocks: [],
  isDirty: false,
  isSaving: false,
  lastSavedAt: null,
  wordCount: 0,
});

// Computed values
export const documentPreview = computed(editor, (state) => 
  extractPreview(state.blocks)
);

export const isEmptyDocument = computed(editor, (state) => 
  state.blocks.every(b => !b.content?.trim())
);
```

---

### 3. Actions (Mutations)

```ts
export const updateTitle = action(editor, 'updateTitle', (store, newTitle: string) => {
  store.setKey('title', newTitle);
  store.setKey('isDirty', true);
  
  // Debounced save
  debouncedSaveTitle(store.get().documentId!, newTitle);
});

export const replaceBlocks = action(editor, 'replaceBlocks', (store, newBlocks: Block[]) => {
  store.setKey('blocks', newBlocks);
  store.setKey('isDirty', true);
  store.setKey('wordCount', calculateWordCount(newBlocks));
  
  debouncedSaveBlocks(store.get().documentId!, newBlocks);
});
```

---

### 4. Real Editor Integration Example

```ts
// In editorCanvas.ts or a dedicated editor island
import { editor, updateTitle, replaceBlocks, setActiveDocument } from '@/stores/editor';

export function initEditor(documentId: string, initialTitle: string, initialBlocks: Block[]) {
  setActiveDocument(documentId, initialTitle, initialBlocks);

  // Sync title input
  const titleEl = document.getElementById('editor-title');
  titleEl?.addEventListener('input', (e) => {
    updateTitle((e.target as HTMLElement).textContent || '');
  });

  // Listen to store changes
  editor.subscribe((state) => {
    // Update saving indicator, last saved time, etc.
    if (state.isSaving) {
      showSavingIndicator();
    }
  });
}
```

---

### 5. Habit Tracker Example

```ts
// src/stores/habits.ts
import { map, computed } from 'nanostores';
import type { HabitWithLogs } from '@/lib/habit/types';

interface HabitState {
  habits: HabitWithLogs[];
  selectedDate: string;
  currentMonth: { from: string; to: string };
  showStreakBanner: boolean;
}

export const habitsStore = map<HabitState>({
  habits: [],
  selectedDate: new Date().toISOString().split('T')[0],
  currentMonth: currentMonthRange(),
  showStreakBanner: false,
});

export const totalStreaks = computed(habitsStore, (state) => 
  state.habits.reduce((sum, h) => sum + (h.current_streak || 0), 0)
);
```

---

### 6. Global Journal Store (Sidebar)

```ts
// src/stores/journal.ts
import { map, computed } from 'nanostores';

export const journal = map({
  documents: [] as DocumentIndexRow[],
  folders: [] as Folder[],
  searchQuery: '',
  activeDocumentId: null as string | null,
  activeFolderId: null as string | null,
});

export const filteredDocuments = computed(journal, (state) => {
  if (!state.searchQuery) return state.documents;
  const q = state.searchQuery.toLowerCase();
  return state.documents.filter(doc => 
    doc.title.toLowerCase().includes(q) || 
    (doc.preview && doc.preview.toLowerCase().includes(q))
  );
});
```

---

## Best Practices for This App

1. **Keep stores small and focused**
   - One store per major feature

2. **Use `action()` for mutations** — keeps side effects (API calls) centralized

3. **Heavy use of `computed()`**
   - Word count, preview text, filtered lists, total stats

4. **Subscribe in client islands only**
   - Never subscribe in `.astro` files

5. **Debounce saves inside actions**

6. **SSR Safety**
   ```ts
   // Only run on client
   if (typeof window !== 'undefined') {
     editor.subscribe(...);
   }
   ```

7. **Testing**
   ```ts
   import { editor } from '@/stores/editor';
   
   editor.set({ ... });
   expect(editor.get().title).toBe('New Title');
   ```

---

## Advanced Patterns You'll Need

### 1. Syncing with URL (`?doc=xxx`)

```ts
import { editor } from '@/stores/editor';

export function syncWithUrl() {
  const url = new URL(window.location.href);
  const docId = url.searchParams.get('doc');
  
  if (docId && docId !== editor.get().documentId) {
    // fetch and setActiveDocument
  }
}
```

### 2. Optimistic Updates (Habit logging)

```ts
export const toggleHabitLog = action(habitsStore, 'toggleHabitLog', 
  async (store, habitId: string, date: string) => {
    // Optimistic update
    const current = store.get();
    // ... update UI immediately
    
    try {
      const result = await actions.habit.upsertLog(...);
      // Confirm
    } catch {
      // Rollback
    }
  }
);
```

---

## Setup Checklist

1. Install: `pnpm add nanostores`
2. Create `src/stores/` folder
3. Import stores in islands only
4. Replace manual `Map` state in editor
5. Add computed values for derived state

---