---
description: Fetch documentation and install a Starwind UI component
---

# Fetch Starwind Component

## Usage

/fetch-component <component-name>

## Prerequisites

- Check [docs/starwind-ref.md](docs/starwind-ref.md) for available components
- Ensure component doesn't already exist in `src/components/starwind/`

## Steps

### 1. Parameter Processing

Convert the component name to kebab-case:

```bash
COMPONENT="{{component-name}}"
KEBAB_COMPONENT=$(echo "$COMPONENT" | sed 's/\([A-Z]\)/-\L\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')
```

### 2. Validate Component

Check component status and determine workflow path:

```bash
# Check if component is in the available list (from starwind-ref.md)
if ! grep -q "${KEBAB_COMPONENT}" docs/starwind-ref.md; then
    echo "Component '${COMPONENT}' not found in available components list"
    echo "Check docs/starwind-ref.md for available components"
    exit 1
fi

# Check component status and set workflow mode
COMPONENT_DIR="src/components/starwind/${KEBAB_COMPONENT}"
DOC_FILE="docs/components/${KEBAB_COMPONENT}.md"
AGENTS_FILE="${COMPONENT_DIR}/AGENTS.md"

if [ -d "$COMPONENT_DIR" ]; then
    echo "Component '${COMPONENT}' exists locally - checking documentation status"
    
    # Check what's missing
    MISSING_FILES=""
    if [ ! -f "$DOC_FILE" ]; then
        MISSING_FILES="$MISSING_FILES documentation"
    fi
    if [ ! -f "$AGENTS_FILE" ]; then
        MISSING_FILES="$MISSING_FILES AGENTS.md"
    fi
    
    if [ -z "$MISSING_FILES" ]; then
        echo "Component '${COMPONENT}' is complete - both documentation and AGENTS.md exist"
        exit 0
    else
        echo "Component '${COMPONENT}' missing:$MISSING_FILES - will fetch and create"
        WORKFLOW_MODE="update"
    fi
else
    echo "Component '${COMPONENT}' not installed locally - will fetch and install"
    WORKFLOW_MODE="install"
fi
```

### 3. Find Component Link

```bash
curl -s "https://starwind.dev/docs/components/" > /tmp/components.html

COMPONENT_LINK=$(grep -o 'href="[^"]*components/[^"]*'"$KEBAB_COMPONENT"'[^"]*"' /tmp/components.html | head -1 | sed 's/href="//' | sed 's/"//')

if [ -z "$COMPONENT_LINK" ]; then
    echo "Component '$COMPONENT' not found on starwind.dev"
    exit 1
fi

FULL_URL="https://starwind.dev$COMPONENT_LINK"
```

### 3. Fetch Component Documentation

```bash
curl -s "$FULL_URL" > /tmp/component.html

# The markdown content 
MARKDOWN_DATA=""

if [ -z "$MARKDOWN_DATA" ]; then
    MARKDOWN_DATA=$(python3 -c "
import re, html, sys

with open('/tmp/component.html', 'r') as f:
    content = f.read()

# Try to find data-markdown attribute (old structure)
markdown_match = re.search(r'data-markdown=\"([^\"]+)\"', content)
if markdown_match:
    decoded = html.unescape(markdown_match.group(1))
    print(decoded)
" 2>/dev/null)
fi

# Method 3: If both fail, try to extract from expressive-code blocks
if [ -z "$MARKDOWN_DATA" ]; then
    MARKDOWN_DATA=$(python3 -c "
import re, html, sys

with open('/tmp/component.html', 'r') as f:
    content = f.read()

# Extract content from expressive-code divs
code_blocks = re.findall(r'<div class=\"expressive-code\">.*?<pre[^>]*>.*?<code[^>]*>(.*?)</code>.*?</pre>.*?</div>', content, re.DOTALL)

if code_blocks:
    # Combine all code blocks
    combined_content = ''
    for block in code_blocks:
        code_content = re.sub(r'<[^>]+>', '', block)
        code_content = html.unescape(code_content)
        combined_content += code_content + '\n\n'
    print(combined_content.strip())
" 2>/dev/null)
fi

if [ -z "$MARKDOWN_DATA" ]; then
    echo "Could not extract markdown data for component '$COMPONENT'"
    exit 1
fi
```

### 4. Create Documentation File (if needed)

```bash
# Only create documentation if it doesn't exist or in update mode
if [ ! -f "$DOC_FILE" ] || [ "$WORKFLOW_MODE" = "update" ]; then
    mkdir -p "$(dirname "$DOC_FILE")"
    echo "$MARKDOWN_DATA" > "$DOC_FILE"
    echo "Created: $DOC_FILE"
else
    echo "Documentation already exists: $DOC_FILE"
fi
```

### 5. Install Component (if needed)

```bash
# Only install component if not already present
if [ "$WORKFLOW_MODE" = "install" ]; then
    pnpm dlx starwind@latest add "$COMPONENT"
else
    echo "Component already installed - skipping installation"
fi
```

### 6. Create AGENTS.md (if needed)

Check line count and either copy or summarize:

```bash
# Only create AGENTS.md if it doesn't exist or in update mode
if [ ! -f "$AGENTS_FILE" ] || [ "$WORKFLOW_MODE" = "update" ]; then
    LINE_COUNT=$(wc -l < "$DOC_FILE")
    AGENTS_DIR="src/components/starwind/${KEBAB_COMPONENT}"
    mkdir -p "$AGENTS_DIR"
    
    if [ "$LINE_COUNT" -le 200 ]; then
        cp "$DOC_FILE" "$AGENTS_DIR/AGENTS.md"
        echo "Created AGENTS.md: $AGENTS_DIR/AGENTS.md (copied directly)"
    else
        # Read the full content of $DOC_FILE and write a concise summary to
        # $AGENTS_DIR/AGENTS.md covering:
        # - Component purpose and when to use it
        # - All sub-components and their props
        # - At least one usage example
        # - Any accessibility or caveats notes
        # Do not truncate — summarize intelligently.
        echo "Created AGENTS.md: $AGENTS_DIR/AGENTS.md (summarized)"
    fi
else
    echo "AGENTS.md already exists: $AGENTS_FILE"
fi
```

### 7. Cleanup

```bash
rm -f /tmp/components.html /tmp/component.html
```
