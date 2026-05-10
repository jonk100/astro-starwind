# Tabs

```astro
---
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/starwind/tabs";
---

<Tabs defaultValue="astro" class="max-w-[400px]">
  <TabsList>
    <TabsTrigger value="astro">Astro</TabsTrigger>
    <TabsTrigger value="next">Next.js</TabsTrigger>
  </TabsList>
  <TabsContent value="astro">
    Build fast websites, faster with Astro's next-gen island architecture.
  </TabsContent>
  <TabsContent value="next">
    The React framework for production-grade applications that scale.
  </TabsContent>
</Tabs>
```

## Installation

```bash
npx starwind@latest add tabs
```

## Usage

### Synced Tabs

Use the `syncKey` prop to synchronize multiple tab groups. All tabs with the same `syncKey` will update together.

```astro
---
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/starwind/tabs";
---

<Tabs defaultValue="react" syncKey="frameworks" class="max-w-[400px]">
  <TabsList>
    <TabsTrigger value="react">React</TabsTrigger>
    <TabsTrigger value="vue">Vue</TabsTrigger>
  </TabsList>
  <TabsContent value="react">
    React is a JavaScript library for building user interfaces.
  </TabsContent>
  <TabsContent value="vue">
    Vue is a progressive framework for building user interfaces.
  </TabsContent>
</Tabs>

<Tabs defaultValue="react" syncKey="frameworks" class="max-w-[400px]">
  <TabsList>
    <TabsTrigger value="react">React</TabsTrigger>
    <TabsTrigger value="vue">Vue</TabsTrigger>
  </TabsList>
  <TabsContent value="react">
    React's virtual DOM optimizes rendering performance.
  </TabsContent>
  <TabsContent value="vue">
    Vue's reactivity system makes state management intuitive.
  </TabsContent>
</Tabs>
```

### Disabled Triggers

Use the `disabled` attribute to prevent a tab from being selected.

```astro
---
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/starwind/tabs";
---

<Tabs defaultValue="active" class="max-w-[400px]">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="pending">Pending</TabsTrigger>
  </TabsList>
  <TabsContent value="active">Active tab content</TabsContent>
  <TabsContent value="disabled">Disabled tab content</TabsContent>
  <TabsContent value="pending">Pending tab content</TabsContent>
</Tabs>
```

### Nested Tabs

Show how tabs can be nested by placing a Tabs component inside a TabsContent panel.

```astro
---
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/starwind/tabs";
---

<Tabs defaultValue="outer-1">
  <TabsList>
    <TabsTrigger value="outer-1">Outer Tab 1</TabsTrigger>
    <TabsTrigger value="outer-2">Outer Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="outer-1">
    Outer Tab 1 content
  </TabsContent>
  <TabsContent value="outer-2">
    <div class="space-y-2">
      This tab contains nested tabs:
      <Tabs defaultValue="inner-a">
        <TabsList>
          <TabsTrigger value="inner-a">Inner A</TabsTrigger>
          <TabsTrigger value="inner-b">Inner B</TabsTrigger>
        </TabsList>
        <TabsContent value="inner-a">Inner tab A content</TabsContent>
        <TabsContent value="inner-b">Inner tab B content</TabsContent>
      </Tabs>
    </div>
  </TabsContent>
</Tabs>
```

## API Reference

### Tabs API Reference

The root component that manages tab state.

| Prop | Type | Default |
|------|------|---------|
| `defaultValue` | `string` | - |
| `syncKey` | `string` | - |
| `class` | `string` | - |

```astro
<Tabs defaultValue="astro" class="max-w-[400px]">
  <!-- TabsList and TabsContent -->
</Tabs>
```

**Additional Notes:**

- `defaultValue`: The tab value that should be active initially
- `syncKey`: When provided, allows multiple `Tabs` instances with the same key to stay in sync

### TabsList

Wraps `TabsTrigger` components.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<TabsList>
  <TabsTrigger value="astro">Astro</TabsTrigger>
  <TabsTrigger value="next">Next.js</TabsTrigger>
</TabsList>
```

### TabsTrigger

Single tab trigger button.

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | Required |
| `disabled` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<TabsTrigger value="astro">Astro</TabsTrigger>
```

**Additional Notes:**

- `value`: Identifier that links this trigger to a matching `TabsContent` panel

### TabsContent

Content panel associated with a trigger.

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | Required |
| `class` | `string` | - |

```astro
<TabsContent value="astro">
  Astro tab content
</TabsContent>
```

**Additional Notes:**

- `value`: Must match the `TabsTrigger` value to be shown when that tab is active
