# Tabs Component Quick Reference

## Overview
A flexible tab navigation system with synchronized state management, disabled states, and support for nested tabs. Perfect for organizing content into switchable panels.

## Installation
```bash
npx starwind@latest add tabs
```

## Import Pattern
```astro
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/starwind/tabs";
```

## Core Components & Props

### Tabs (Root Container)
- `defaultValue` (string) - Initial active tab value
- `syncKey` (string) - Key for synchronizing multiple tab instances
- `class` (string) - Custom styling

### TabsList
- `class` (string) - Custom styling for tab trigger container

### TabsTrigger
- `value` (string, required) - Unique identifier for the tab
- `disabled` (boolean, default: false) - Disable tab interaction
- `class` (string) - Custom styling for tab button

### TabsContent
- `value` (string, required) - Must match corresponding TabsTrigger value
- `class` (string) - Custom styling for content panel

## Common Usage Patterns

### Basic Tabs
```astro
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

### Synced Tabs
```astro
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

<!-- Second tabs group stays in sync -->
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

### Disabled Tabs
```astro
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
```astro
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

### Tabs with Custom Styling
```astro
<Tabs defaultValue="tab1" class="w-full">
  <TabsList class="grid w-full grid-cols-3">
    <TabsTrigger value="tab1" class="data-[state=active]:bg-primary">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2" class="data-[state=active]:bg-primary">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3" class="data-[state=active]:bg-primary">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" class="mt-4">
    Content for tab 1 with custom styling.
  </TabsContent>
  <TabsContent value="tab2" class="mt-4">
    Content for tab 2 with custom styling.
  </TabsContent>
  <TabsContent value="tab3" class="mt-4">
    Content for tab 3 with custom styling.
  </TabsContent>
</Tabs>
```

### Vertical Tabs
```astro
<Tabs defaultValue="vertical-1" class="flex">
  <TabsList class="flex flex-col h-fit space-y-2">
    <TabsTrigger value="vertical-1">Vertical 1</TabsTrigger>
    <TabsTrigger value="vertical-2">Vertical 2</TabsTrigger>
    <TabsTrigger value="vertical-3">Vertical 3</TabsTrigger>
  </TabsList>
  <div class="ml-4">
    <TabsContent value="vertical-1">
      Vertical tab 1 content
    </TabsContent>
    <TabsContent value="vertical-2">
      Vertical tab 2 content
    </TabsContent>
    <TabsContent value="vertical-3">
      Vertical tab 3 content
    </TabsContent>
  </div>
</Tabs>
```

## Advanced Features

### Programmatic Control
```astro
<script>
  // Access tab state programmatically
  const tabsElement = document.querySelector('[data-state="active"]');
  
  // Listen for tab changes
  document.addEventListener('tabs:change', (e) => {
    console.log('Tab changed to:', e.detail.value);
  });
</script>
```

### Dynamic Tab Content
```astro
---
const tabs = [
  { id: 'profile', label: 'Profile', content: 'User profile information' },
  { id: 'settings', label: 'Settings', content: 'Application settings' },
  { id: 'security', label: 'Security', content: 'Security preferences' },
];
---

<Tabs defaultValue={tabs[0].id}>
  <TabsList>
    {tabs.map((tab) => (
      <TabsTrigger value={tab.id}>{tab.label}</TabsTrigger>
    ))}
  </TabsList>
  {tabs.map((tab) => (
    <TabsContent value={tab.id}>{tab.content}</TabsContent>
  ))}
</Tabs>
```

### Conditional Tab Rendering
```astro
---
const userRole = 'admin';
---

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    {userRole === 'admin' && (
      <TabsTrigger value="admin">Admin Panel</TabsTrigger>
    )}
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  {userRole === 'admin' && (
    <TabsContent value="admin">Admin content</TabsContent>
  )}
</Tabs>
```

## Key Features
- **Synchronized State**: Multiple tab groups can stay in sync using `syncKey`
- **Disabled States**: Individual tabs can be disabled to prevent interaction
- **Nested Support**: Tabs can be nested within other tab content
- **Flexible Layout**: Support for horizontal, vertical, and grid layouts
- **Accessibility**: Full keyboard navigation and ARIA support
- **Custom Styling**: Extensive styling options with CSS classes
- **Dynamic Content**: Works with dynamic tab generation

## Best Practices
- Always provide matching `value` props for `TabsTrigger` and `TabsContent`
- Use `defaultValue` to set the initially active tab
- Use `syncKey` when multiple tab groups need to stay synchronized
- Add `disabled` prop for tabs that shouldn't be accessible
- Consider nested tabs for complex content organization
- Use semantic HTML structure for better accessibility
- Add proper spacing and visual hierarchy with custom classes
- Test keyboard navigation for accessibility compliance

## Styling Tips
- Use `data-[state=active]` selector for active tab styling
- Apply `data-[disabled]` selector for disabled tab styling
- Use `grid` or `flex` layouts on `TabsList` for custom arrangements
- Add transition classes for smooth tab switching animations
- Consider responsive design for mobile vs desktop layouts

## Documentation
For detailed examples and advanced usage, see the [complete Tabs documentation](../../../docs/components/tabs.md).

---
