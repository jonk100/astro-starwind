# Dropzone

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<div class="w-full max-w-[400px]">
  <Dropzone />
</div>
```

## Installation

```bash
npx starwind@latest add dropzone
```

## Usage

> **Info:** No dropped files on this page are uploaded anywhere.

### Default

The default Dropzone component displays a cloud upload icon with a prompt to upload files, and shows what files have been selected.

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<Dropzone />
```

### Custom Content

The dropzone components can be customized through slots. The default `<Dropzone />` component has the following three components in the slot if nothing is passed:

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<DropzoneUploadIndicator />
<DropzoneLoadingIndicator />
<DropzoneFilesList />
```

### Loading

Nothing is actually uploaded when a file is selected, as internally a standard html `<input type="file">` is used. To show a loading indication initially, you can use the `isUploading` prop.

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<Dropzone isUploading={true} />
```

You can also use the `data-is-uploading` attribute to show or hide a loading indicator at any time. This is useful if you want to show a loading indicator while a file is actually being uploaded (like on form submission).

### Accept Specific File Types

You can limit the types of files that users can select by using the `accept` attribute.

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<Dropzone accept="image/*" />
```

### Multiple Files

Allow users to select multiple files by using the `multiple` attribute.

```astro
---
import { Dropzone, DropzoneFilesList, DropzoneLoadingIndicator, DropzoneUploadIndicator } from "@/components/starwind/dropzone";
---

<Dropzone multiple />
```

## API Reference

### Dropzone

The main Dropzone component wraps the entire file upload interface.

| Prop | Type | Default |
|------|------|---------|
| `id` | `string` | Auto-generated |
| `accept` | `string` | - |
| `multiple` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `name` | `string` | - |
| `isUploading` | `boolean` | `false` |
| `class` | `string` | - |

```astro
<Dropzone accept="image/*" multiple />
```

**Additional Notes:**
- `id`: Unique identifier for the element. Assigns the ID to the `<label>` element, and the `<input>` element gets the same ID with `-input` suffix
- `accept`: File types the input should accept (e.g., `"image/*"`, `".pdf"`)
- `isUploading`: Whether to show the loading indicator
- The component provides a default slot to customize content. By default includes `DropzoneUploadIndicator`, `DropzoneLoadingIndicator`, and `DropzoneFilesList`

### DropzoneFilesList

Displays the list of uploaded files.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<DropzoneFilesList />
```

### DropzoneUploadIndicator

Displays the upload icon and text that are shown when no files are being uploaded.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<DropzoneUploadIndicator>
  <span>Custom upload message</span>
</DropzoneUploadIndicator>
```

### DropzoneLoadingIndicator

Displays a loading spinner and text for use when files are being uploaded.

| Prop | Type | Default |
|------|------|---------|
| `class` | `string` | - |

```astro
<DropzoneLoadingIndicator>
  <span>Custom loading message</span>
</DropzoneLoadingIndicator>
```

**Additional Notes:**
- The component provides a default slot to customize content. By default includes `DropzoneUploadIndicator`, `DropzoneLoadingIndicator`, and `DropzoneFilesList`
- Use `data-is-uploading` attribute to show or hide a loading indicator at any time. This is useful if you want to show a loading indicator while a file is actually being uploaded (like on form submission).
