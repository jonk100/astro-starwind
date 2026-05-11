# Dropzone Component

## Purpose and Usage

The Dropzone component provides a drag-and-drop file upload interface with visual feedback. Use it for file uploads, image galleries, document management, or any situation where users need to upload files.

## Components

### Dropzone

The main Dropzone component that wraps the entire file upload interface.

| Prop          | Type      | Default        | Description                                                                                                                         |
|---------------|-----------|----------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `id`          | `string`  | Auto-generated | Unique identifier for the element. Assigns ID to the `<label>` element, and `<input>` element gets the same ID with `-input` suffix |
| `accept`      | `string`  | -              | File types the input should accept (e.g., `"image/*"`, `".pdf"`)                                                                    |
| `multiple`    | `boolean` | `false`        | Whether users can select multiple files                                                                                             |
| `disabled`    | `boolean` | `false`        | Whether the dropzone is disabled                                                                                                    |
| `required`    | `boolean` | `false`        | Whether file selection is required                                                                                                  |
| `name`        | `string`  | -              | Name for the form element                                                                                                           |
| `isUploading` | `boolean` | `false`        | Whether to show the loading indicator                                                                                               |
| `class`       | `string`  | -              | Additional CSS classes for styling                                                                                                  |

### DropzoneFilesList

Displays a list of uploaded files.

| Prop    | Type     | Default | Description                        |
|---------|----------|---------|------------------------------------|
| `class` | `string` | -       | Additional CSS classes for styling |

### DropzoneUploadIndicator

Displays the upload icon and text shown when no files are being uploaded.

| Prop    | Type     | Default | Description                        |
|---------|----------|---------|------------------------------------|
| `class` | `string` | -       | Additional CSS classes for styling |

### DropzoneLoadingIndicator

Displays a loading spinner and text for use when files are being uploaded.

| Prop    | Type     | Default | Description                        |
|---------|----------|---------|------------------------------------|
| `class` | `string` | -       | Additional CSS classes for styling |

## Usage Examples

### Basic Dropzone

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<div class="w-full max-w-[400px]">
  <Dropzone />
</div>
```

### Custom Content

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<Dropzone>
  <DropzoneUploadIndicator>
    <span class="text-lg font-medium">Drag and drop files here</span>
  </DropzoneUploadIndicator>
  <DropzoneLoadingIndicator />
  <DropzoneFilesList />
</Dropzone>
```

### File Type Restrictions

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<Dropzone accept="image/*" />
```

### Multiple Files

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<Dropzone multiple />
```

### Loading State

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<Dropzone isUploading={true} />
```

### Form Integration

```astro
---
import { Button } from "@/components/starwind/button";
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<div class="flex w-full max-w-[400px] flex-col gap-4">
  <form id="dropzone-form-demo" class="space-y-4">
    <Dropzone id="my-dropzone" name="dropzone-file" />
    <Button type="submit" class="w-full">Submit</Button>
  </form>
</div>

<script>
  function handleFormSubmit() {
    const form = document.querySelector("#dropzone-form-demo") as HTMLFormElement;
    const dropzone = document.querySelector("#my-dropzone") as HTMLElement;
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        dropzone.setAttribute("data-is-uploading", "true");

        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());

        // demo form data logging
        console.log("Form submission values:", formValues);

        // You can add additional logic here like:
        // - Form validation
        // - API submission
        // - Success/error handling

        // Simulate API submission
        setTimeout(() => {
          dropzone.setAttribute("data-is-uploading", "false");
        }, 2000);
      });
    }
  }

  handleFormSubmit();

  document.addEventListener("astro:after-swap", handleFormSubmit);
</script>
```

## Features

- **Drag and drop**: Full drag-and-drop file upload support
- **File selection**: Click to browse and select files
- **Multiple files**: Support for selecting multiple files at once
- **File type filtering**: Restrict accepted file types
- **Loading states**: Built-in loading indicators and progress
- **Customizable content**: Slot-based customization for all UI elements
- **Form integration**: Works seamlessly with forms
- **Accessible**: Full keyboard navigation and ARIA support
- **Responsive design**: Adapts to different screen sizes

## Accessibility Notes

- Includes proper ARIA attributes for screen readers
- Keyboard navigation support (Tab, Enter, Space, Escape keys)
- Focus management for drag states and file selection
- High contrast for visibility
- Semantic file input structure for assistive technology
- Consider using appropriate labels and descriptions
- Test with screen readers for proper announcements
- Ensure sufficient color contrast for all states

## Best Practices

- Use clear upload instructions and visual feedback
- Consider file type restrictions for security
- Provide helpful error messages for invalid files
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use meaningful loading states and progress indicators
- Test with assistive technology for proper behavior
- Consider mobile touch interactions
- Use consistent styling patterns across your interface
- Provide feedback for successful and failed uploads
