/**
 * @file toNotion.ts
 * @description Reads the rich snapshot JSON produced by snapshot.ts and
 * upserts one Notion page per file into a Notion database.
 *
 * "Upsert" means:
 *   - If a page already exists for that file path → update its content.
 *   - If no page exists yet → create a new one.
 *
 * File content is written to the page body as a series of code blocks,
 * each holding up to MAX_BLOCK_CHARS characters (Notion's API limit is
 * 2,000 characters per rich-text block).
 *
 * Required environment variables:
 *   NOTION_KEY      Your Notion integration secret token.
 *   NOTION_DB       The ID of the target Notion database.
 *
 * Optional environment variables:
 *   SNAPSHOT_IN     Path to the snapshot JSON file (default: "snapshot.json")
 *   API_VERSION     Notion API version header (default: "2022-06-28")
 *
 * Required Notion database properties:
 *   Name          (title)        — The file's repo-relative path.
 *   Path          (rich_text)    — Duplicate of the path, stable lookup key.
 *   Layer         (select)       — Broad architectural layer, e.g. "components".
 *   Sublayer      (select)       — Subdirectory within the layer, e.g. "sectional".
 *   Tags          (multi_select) — Path-derived tags array.
 *   LastModified  (date)         — File's last modification timestamp.
 *   Lines         (number)       — Total line count.
 *   SizeKb        (number)       — File size in kilobytes.
 *   TodoCount     (number)       — Number of TODO/FIXME comments.
 *   HasJSDoc      (checkbox)     — Whether the file contains a JSDoc block.
 *   UtilityClasses (number)      — Count of Tailwind utility class occurrences.
 *   UpdatedAt     (date)         — ISO timestamp of the last sync run.
 */

import fs from "fs";
import path from "path";
import type { SnapshotEntry } from "./snapshot";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const NOTION_KEY = process.env.NOTION_KEY ?? "";
const NOTION_DB = process.env.NOTION_DB ?? "";
const SNAPSHOT_IN = process.env.SNAPSHOT_IN ?? "snapshot.json";
const API_VERSION = process.env.API_VERSION ?? "2022-06-28";

/** Maximum characters per Notion rich-text block. */
const MAX_BLOCK_CHARS = 1900;

/** Milliseconds to wait between Notion API calls to respect rate limits. */
const RATE_LIMIT_DELAY_MS = 350;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shape of a single Notion rich-text object (plain text only). */
interface NotionRichText {
  type: "text";
  text: { content: string };
}

/** A Notion code block as expected by the blocks API. */
interface NotionCodeBlock {
  object: "block";
  type: "code";
  code: {
    rich_text: NotionRichText[];
    language: string;
  };
}

/** Minimal shape of a Notion page returned by the search endpoint. */
interface NotionPage {
  id: string;
  properties: {
    Path?: {
      rich_text: Array<{ plain_text: string }>;
    };
  };
}

/** Response shape from the Notion database query endpoint. */
interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Pauses execution for `ms` milliseconds.
 * Used to stay within Notion's rate limit of ~3 requests/second.
 *
 * @param ms - Duration to sleep in milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Derives a Notion-compatible code block language string from a file
 * extension. Falls back to "plain text" for unknown extensions.
 *
 * @param filePath - Repo-relative file path, e.g. "src/lib/parser.ts"
 * @returns A language identifier accepted by Notion's code block API.
 */
function languageFromPath(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".ts": "typescript",
    ".js": "javascript",
    ".astro": "html",
    ".css": "css",
    ".html": "html",
    ".json": "json",
    ".md": "markdown",
    ".sh": "bash",
    ".yml": "yaml",
    ".yaml": "yaml",
  };
  return map[ext] ?? "plain text";
}

/**
 * Splits a long string into chunks of at most `size` characters.
 * Used to break file contents into Notion-sized code blocks.
 *
 * @param text - The full string to split.
 * @param size - Maximum characters per chunk.
 * @returns Array of string chunks.
 */
function chunkString(text: string, size: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

/**
 * Builds an array of Notion code blocks from file contents.
 * Each block holds one chunk so that no single block exceeds Notion's
 * rich-text character limit.
 *
 * @param contents - Full UTF-8 file contents.
 * @param language - Notion language identifier for syntax highlighting.
 * @returns Array of Notion block objects ready to POST to the API.
 */
function buildCodeBlocks(
  contents: string,
  language: string
): NotionCodeBlock[] {
  const chunks = chunkString(contents, MAX_BLOCK_CHARS);
  return chunks.map((chunk) => ({
    object: "block",
    type: "code",
    code: {
      rich_text: [{ type: "text", text: { content: chunk } }],
      language,
    },
  }));
}

/**
 * Builds the Notion `properties` payload for a file entry.
 * Shared between createPage and updatePage to keep property definitions
 * in one place.
 *
 * @param filePath - Repo-relative file path.
 * @param entry    - Rich snapshot entry for this file.
 * @param syncedAt - ISO timestamp of the current sync run.
 * @returns Notion properties object ready to include in a page request.
 */
function buildProperties(
  filePath: string,
  entry: SnapshotEntry,
  syncedAt: string
): Record<string, unknown> {
  return {
    Name: {
      title: [{ type: "text", text: { content: filePath } }],
    },
    Path: {
      rich_text: [{ type: "text", text: { content: filePath } }],
    },
    Layer: {
      select: { name: entry.layer },
    },
    // Only set Sublayer when a meaningful sublayer exists
    ...(entry.sublayer
      ? { Sublayer: { select: { name: entry.sublayer } } }
      : {}),
    Tags: {
      multi_select: entry.tags.map((tag) => ({ name: tag })),
    },
    LastModified: {
      date: { start: entry.lastModified },
    },
    Lines: {
      number: entry.lines,
    },
    SizeKb: {
      number: entry.sizeKb,
    },
    TodoCount: {
      number: entry.todoCount,
    },
    // HasJSDoc is null for non-applicable file types — omit the property
    // entirely in that case so Notion doesn't receive an invalid payload.
    ...(entry.hasJSDoc !== null
      ? { HasJSDoc: { checkbox: entry.hasJSDoc } }
      : {}),
    // UtilityClasses is null for non-applicable file types — same treatment.
    ...(entry.utilityClassCount !== null
      ? { UtilityClasses: { number: entry.utilityClassCount } }
      : {}),
    UpdatedAt: {
      date: { start: syncedAt },
    },
  };
}

// ---------------------------------------------------------------------------
// Notion API wrappers
// ---------------------------------------------------------------------------

/**
 * Base fetch wrapper for all Notion API calls.
 * Throws if the response status is not OK.
 *
 * @param endpoint - Path after https://api.notion.com, e.g. "/v1/pages"
 * @param method   - HTTP method.
 * @param body     - Optional request body (will be JSON-serialised).
 * @returns Parsed JSON response body.
 */
async function notionFetch<T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: unknown
): Promise<T> {
  const res = await fetch(`https://api.notion.com${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${NOTION_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": API_VERSION,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Notion API ${method} ${endpoint} → ${res.status}: ${text}`
    );
  }

  return res.json() as Promise<T>;
}

/**
 * Fetches all existing pages in the database, returning a map of
 * file path → Notion page ID. Handles Notion's cursor-based pagination.
 *
 * @returns Record mapping each file path stored in the "Path" property
 *          to the corresponding Notion page ID.
 */
async function fetchExistingPages(): Promise<Record<string, string>> {
  const pageMap: Record<string, string> = {};
  let cursor: string | null = null;
  let hasMore = true;

  while (hasMore) {
    const body: Record<string, unknown> = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;

    const response = await notionFetch<NotionQueryResponse>(
      `/v1/databases/${NOTION_DB}/query`,
      "POST",
      body
    );

    for (const page of response.results) {
      const pathProp = page.properties?.Path?.rich_text?.[0]?.plain_text;
      if (pathProp) {
        pageMap[pathProp] = page.id;
      }
    }

    hasMore = response.has_more;
    cursor = response.next_cursor;

    if (hasMore) await sleep(RATE_LIMIT_DELAY_MS);
  }

  return pageMap;
}

/**
 * Deletes all existing child blocks from a Notion page so that the page
 * can be rewritten with fresh content on update.
 *
 * @param pageId - The Notion page ID whose blocks should be cleared.
 */
async function clearPageBlocks(pageId: string): Promise<void> {
  const res = await notionFetch<{ results: Array<{ id: string }> }>(
    `/v1/blocks/${pageId}/children`,
    "GET"
  );

  for (const block of res.results) {
    await notionFetch(`/v1/blocks/${block.id}`, "DELETE", undefined);
    await sleep(RATE_LIMIT_DELAY_MS);
  }
}

/**
 * Creates a new Notion page in the target database with the given
 * properties and code-block children.
 *
 * @param filePath  - Repo-relative file path.
 * @param entry     - Rich snapshot entry for this file.
 * @param blocks    - Array of code blocks to append as page children.
 * @param syncedAt  - ISO timestamp of the current sync run.
 */
async function createPage(
  filePath: string,
  entry: SnapshotEntry,
  blocks: NotionCodeBlock[],
  syncedAt: string
): Promise<void> {
  await notionFetch("/v1/pages", "POST", {
    parent: { database_id: NOTION_DB },
    properties: buildProperties(filePath, entry, syncedAt),
    // Notion limits page creation to 100 blocks at a time
    children: blocks.slice(0, 100),
  });

  if (blocks.length > 100) {
    console.warn(
      `[toNotion] ${filePath} has ${blocks.length} blocks — only first 100 written on create.`
    );
  }
}

/**
 * Updates an existing Notion page: refreshes its properties, clears its
 * current blocks, and writes fresh code blocks.
 *
 * @param pageId   - Notion page ID to update.
 * @param filePath - Repo-relative file path (for logging).
 * @param entry    - Rich snapshot entry for this file.
 * @param blocks   - Array of fresh code blocks to write.
 * @param syncedAt - ISO timestamp of the current sync run.
 */
async function updatePage(
  pageId: string,
  filePath: string,
  entry: SnapshotEntry,
  blocks: NotionCodeBlock[],
  syncedAt: string
): Promise<void> {
  // 1. Refresh all properties
  await notionFetch(`/v1/pages/${pageId}`, "PATCH", {
    properties: buildProperties(filePath, entry, syncedAt),
  });

  // 2. Clear existing blocks
  await clearPageBlocks(pageId);

  // 3. Append fresh blocks (max 100 per request)
  await notionFetch(`/v1/blocks/${pageId}/children`, "PATCH", {
    children: blocks.slice(0, 100),
  });
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * Main entry point.
 * Reads snapshot.json, fetches existing Notion pages, then creates or
 * updates one page per file with full metadata and code block content.
 */
async function main(): Promise<void> {
  // Validate required config
  if (!NOTION_KEY) {
    console.error("[toNotion] NOTION_KEY is not set.");
    process.exit(1);
  }
  if (!NOTION_DB) {
    console.error("[toNotion] NOTION_DB is not set.");
    process.exit(1);
  }
  if (!fs.existsSync(SNAPSHOT_IN)) {
    console.error(`[toNotion] Snapshot file not found: ${SNAPSHOT_IN}`);
    process.exit(1);
  }

  // Load snapshot
  const raw = fs.readFileSync(SNAPSHOT_IN, "utf-8");
  const snapshot: Record<string, SnapshotEntry> = JSON.parse(raw);
  const filePaths = Object.keys(snapshot);

  console.log(`[toNotion] Loaded ${filePaths.length} files from ${SNAPSHOT_IN}`);

  // Single timestamp for the entire sync run
  const syncedAt = new Date().toISOString();

  // Fetch existing pages to decide create vs update
  console.log("[toNotion] Fetching existing Notion pages...");
  const existingPages = await fetchExistingPages();
  console.log(
    `[toNotion] Found ${Object.keys(existingPages).length} existing pages.`
  );

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const filePath of filePaths) {
    const entry = snapshot[filePath];
    const language = languageFromPath(filePath);
    const blocks = buildCodeBlocks(entry.contents, language);
    const existingPageId = existingPages[filePath];

    try {
      if (existingPageId) {
        await updatePage(existingPageId, filePath, entry, blocks, syncedAt);
        console.log(`[toNotion] Updated: ${filePath}`);
        updated++;
      } else {
        await createPage(filePath, entry, blocks, syncedAt);
        console.log(`[toNotion] Created: ${filePath}`);
        created++;
      }
    } catch (err) {
      console.error(`[toNotion] Failed: ${filePath}`, err);
      failed++;
    }

    await sleep(RATE_LIMIT_DELAY_MS);
  }

  console.log(
    `[toNotion] Done. Created: ${created}, Updated: ${updated}, Failed: ${failed}`
  );

  if (failed > 0) process.exit(1);
}

main();