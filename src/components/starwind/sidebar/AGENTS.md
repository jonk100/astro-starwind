# Sidebar Component Quick Reference

## Overview
A comprehensive, composable navigation sidebar with collapsible states, keyboard shortcuts, and extensive customization options. Perfect for application layouts with complex navigation hierarchies.

## Installation
```bash
npx starwind@latest add sidebar
```

## CSS Setup Required
Add these CSS variables to your global CSS file (usually `src/styles/starwind.css`):

```scss
@theme inline {
  --color-sidebar: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-outline: var(--sidebar-outline);
}

:root {
  --sidebar-background: var(--color-neutral-50);
  --sidebar-foreground: var(--color-neutral-950);
  --sidebar-primary: var(--color-blue-700);
  --sidebar-primary-foreground: var(--color-neutral-50);
  --sidebar-accent: var(--color-neutral-100);
  --sidebar-accent-foreground: var(--color-neutral-900);
  --sidebar-border: var(--color-neutral-200);
  --sidebar-outline: var(--color-neutral-400);
}

.dark {
  --sidebar-background: var(--color-neutral-900);
  --sidebar-foreground: var(--color-neutral-50);
  --sidebar-primary: var(--color-blue-700);
  --sidebar-primary-foreground: var(--color-neutral-50);
  --sidebar-accent: var(--color-neutral-800);
  --sidebar-accent-foreground: var(--color-neutral-100);
  --sidebar-border: var(--color-neutral-800);
  --sidebar-outline: var(--color-neutral-600);
}
```

## Import Pattern
```astro
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInput,
} from "@/components/starwind/sidebar";
```

## Core Components & Props

### SidebarProvider
- `defaultOpen` (boolean, default: true) - Initial sidebar state
- `keyboardShortcut` (string, default: "b") - Key for toggle shortcut
- `class` (string) - Custom styling

### Sidebar
- `side` ("left" | "right", default: "left") - Sidebar position
- `variant` ("sidebar" | "floating" | "inset", default: "sidebar") - Visual style
- `collapsible` ("offcanvas" | "icon" | "none", default: "offcanvas") - Collapse behavior
- `class` (string) - Custom styling

### SidebarTrigger
- `variant` (Button variant, default: "ghost") - Button style
- `size` (Button size, default: "icon-sm") - Button size
- `class` (string) - Custom styling

### SidebarMenuButton
- `href` (string) - Link destination
- `asChild` (boolean, default: false) - Render child instead of button
- `isActive` (boolean, default: false) - Active state
- `tooltip` (string) - Tooltip text when collapsed
- `variant` ("default" | "outline", default: "default") - Button variant
- `size` ("default" | "sm" | "lg", default: "default") - Button size
- `class` (string) - Custom styling

### SidebarMenuSubButton
- `href` (string) - Link destination
- `asChild` (boolean, default: false) - Render child instead of button
- `isActive` (boolean, default: false) - Active state
- `size` ("sm" | "md", default: "md") - Button size
- `class` (string) - Custom styling

### SidebarMenuAction
- `asChild` (boolean, default: false) - Render child instead of button
- `showOnHover` (boolean, default: false) - Show only on hover
- `class` (string) - Custom styling

### SidebarMenuSkeleton
- `showIcon` (boolean, default: false) - Show icon placeholder
- `class` (string) - Custom styling

## Basic Layout Structure

### Provider Setup
```astro
<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
  <main>
    <SidebarTrigger />
    <slot />
  </main>
</SidebarProvider>
```

### Inset Variant
```astro
<SidebarProvider>
  <Sidebar variant="inset">
    {/* Sidebar content */}
  </Sidebar>
  <SidebarInset>
    <main>{/* Main content */}</main>
  </SidebarInset>
</SidebarProvider>
```

## Common Usage Patterns

### Basic Navigation Menu
```astro
<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
              <CodeIcon class="size-5" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Starwind UI</span>
              <span class="text-sidebar-foreground/70 truncate text-xs">Enterprise</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem>
                <SidebarMenuButton href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>

  <main class="bg-background flex flex-1 flex-col">
    <header class="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <span class="text-muted-foreground text-sm">Main Content</span>
    </header>
    <div class="flex-1 p-6">
      <p class="text-muted-foreground text-sm">
        Use <kbd class="bg-muted rounded px-1.5 py-0.5 text-xs font-medium">Ctrl+B</kbd> to toggle the sidebar.
      </p>
    </div>
  </main>
</SidebarProvider>
```

### Collapsible Menu with Submenus
```astro
<SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {navMain.map((item) => (
          <Collapsible defaultOpen={item.isActive} class="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  <item.icon />
                  <span>{item.title}</span>
                  <ChevronRightIcon class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href={subItem.url}>
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</SidebarContent>
```

### User Menu in Footer
```astro
<SidebarFooter>
  <SidebarMenu>
    <SidebarMenuItem>
      <Dropdown>
        <DropdownTrigger asChild>
          <SidebarMenuButton size="lg">
            <Avatar class="size-10 shrink-0 rounded-lg">
              <AvatarImage src="https://github.com/boston343.png" alt="boston343" />
              <AvatarFallback class="rounded-lg">B3</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Boston343</span>
              <span class="text-sidebar-foreground/70 truncate text-xs">@boston343</span>
            </div>
            <ChevronUpIcon class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownTrigger>
        <DropdownContent class="w-full min-w-48 rounded-lg" side="top">
          <DropdownLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="size-8 rounded-lg">
                <AvatarImage src="https://github.com/boston343.png" alt="boston343" />
                <AvatarFallback class="rounded-lg">B3</AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">boston343</span>
                <span class="text-muted-foreground truncate text-xs">@boston343</span>
              </div>
            </div>
          </DropdownLabel>
          <DropdownSeparator />
          <DropdownItem as="a" href="#">
            <SparklesIcon class="mr-2 size-4" />
            Upgrade to Pro
          </DropdownItem>
          <DropdownItem as="a" href="#">
            <LogoutIcon class="mr-2 size-4" />
            Log out
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>
```

### Menu Items with Actions and Badges
```astro
<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton href="/projects">Projects</SidebarMenuButton>
    <SidebarMenuAction showOnHover>
      <PlusIcon />
    </SidebarMenuAction>
  </SidebarMenuItem>
  
  <SidebarMenuItem>
    <SidebarMenuButton href="/inbox">Inbox</SidebarMenuButton>
    <SidebarMenuBadge>24</SidebarMenuBadge>
  </SidebarMenuItem>
  
  <SidebarMenuItem>
    <SidebarMenuButton isActive href="/home">Home</SidebarMenuButton>
    <SidebarMenuAction class="peer-data-[active=true]/menu-button:opacity-100">
      <HomeIcon />
    </SidebarMenuAction>
  </SidebarMenuItem>
</SidebarMenu>
```

### Loading State
```astro
<SidebarMenu>
  {Array.from({ length: 5 }).map(() => (
    <SidebarMenuItem>
      <SidebarMenuSkeleton showIcon />
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

## Advanced Features

### Custom Width
```astro
<SidebarProvider
  style={{
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  }}
>
  <Sidebar />
</SidebarProvider>
```

### Custom Keyboard Shortcut
```astro
<SidebarProvider keyboardShortcut="s">
  {/* Toggle with Cmd+S or Ctrl+S */}
</SidebarProvider>
```

### State Events
```astro
<script>
  const provider = document.querySelector('[data-slot="sidebar-provider"]');
  provider?.addEventListener("sidebar:change", (e) => {
    const { open, state } = e.detail;
    console.log("Sidebar is now:", state);
  });
</script>
```

## Conditional Styling

### Collapsible State
```astro
<Sidebar collapsible="icon">
  <SidebarContent>
    <SidebarGroup class="group-data-[collapsible=icon]:hidden">
      {/* Hidden when collapsed to icons */}
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
```

### Active State
```astro
<SidebarMenuItem>
  <SidebarMenuButton isActive />
  <SidebarMenuAction class="peer-data-[active=true]/menu-button:opacity-100" />
</SidebarMenuItem>
```

## Key Features
- **Composable Architecture**: Modular components for flexible layouts
- **Collapsible States**: Offcanvas, icon-only, and non-collapsible modes
- **Keyboard Shortcuts**: Default Ctrl+B/Cmd+B toggle with customization
- **Responsive Design**: Adapts to different screen sizes
- **Theme Support**: Full dark/light mode with CSS variables
- **Accessibility**: Semantic HTML and ARIA support
- **Rich Interactions**: Tooltips, dropdowns, and hover states
- **Loading States**: Built-in skeleton components

## Best Practices
- Always wrap with `SidebarProvider` for state management
- Use `SidebarHeader` and `SidebarFooter` for sticky content
- Group related items with `SidebarGroup`
- Add tooltips for collapsed state with `tooltip` prop
- Use `isActive` prop to highlight current page
- Consider `collapsible="icon"` for space-efficient navigation
- Add `SidebarRail` for edge-clicking toggle behavior
- Use `showOnHover` for secondary actions to reduce clutter

## Documentation
For detailed examples and advanced usage, see the [complete Sidebar documentation](../../../docs/components/sidebar.md).

---
