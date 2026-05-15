/**
 * @file snapshot.ts
 * @description Walks one or more source directories and writes a JSON file
 * mapping each file's repo-relative path to a rich metadata entry including
 * the file's full contents and computed metrics.
 *
 * Configuration is driven entirely by environment variables so the same
 * script works locally and inside GitHub Actions without modification.
 *
 * Environment variables:
 *   SNAPSHOT_DIRS   Comma-separated list of directories to scan (default: "src")
 *   SNAPSHOT_OUT    Path to write the output JSON (default: "snapshot.json")
 *   SNAPSHOT_EXTS   Comma-separated file extensions to include
 *                   (default: ".astro,.ts,.css,.html,.json,.md")
 *
 * Note: .mdx is intentionally excluded — content files are a separate concern
 * and are better indexed via a dedicated content-aware workflow.
 */

import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Root of the repository — the directory this script is called from. */
const REPO_ROOT = process.cwd();

/**
 * Directories to scan, relative to the repo root.
 * Override with SNAPSHOT_DIRS="src,public,scripts"
 */
const SNAPSHOT_DIRS: string[] = (process.env.SNAPSHOT_DIRS ?? "src")
  .split(",")
  .map((d) => d.trim())
  .filter(Boolean);

/**
 * Where to write the resulting JSON file.
 * Override with SNAPSHOT_OUT="dist/snapshot.json"
 */
const SNAPSHOT_OUT: string = process.env.SNAPSHOT_OUT ?? "snapshot.json";

/**
 * File extensions to include in the snapshot.
 * .mdx is intentionally omitted — handle content files separately.
 * Override with SNAPSHOT_EXTS=".astro,.ts,.css"
 */
const SNAPSHOT_EXTS: Set<string> = new Set(
  (process.env.SNAPSHOT_EXTS ?? ".astro,.ts,.css,.html,.json,.md")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
);

/**
 * Directory names that are always skipped, regardless of where they appear
 * in the tree.
 */
const IGNORE_DIRS: Set<string> = new Set([
  "node_modules",
  ".git",
  "dist",
  ".astro",
  ".cache",
  "coverage",
]);

/**
 * File extensions that may contain Tailwind utility classes.
 * Utility class counting is skipped for all other extensions.
 */
const TAILWIND_EXTS: Set<string> = new Set([".astro", ".html"]);

/**
 * File extensions that may contain JSDoc comments.
 * JSDoc detection is skipped for non-script/non-component extensions.
 */
const JSDOC_EXTS: Set<string> = new Set([".astro", ".ts", ".js"]);

/**
 * Common Tailwind utility class prefixes used to identify utility classes
 * in component/layout/page files.
 */
const TAILWIND_PREFIXES =
  /\b(flex|grid|block|inline|hidden|text-|bg-|p-|px-|py-|pt-|pb-|pl-|pr-|m-|mx-|my-|mt-|mb-|ml-|mr-|w-|h-|min-|max-|border|rounded|shadow|gap-|space-|col-|row-|items-|justify-|self-|order-|overflow|z-|opacity-|transition|duration-|ease-|delay-|animate-|cursor-|pointer-|select-|resize|appearance|outline|ring|divide|placeholder|sr-only|not-sr-only|truncate|uppercase|lowercase|capitalize|underline|line-through|italic|font-|leading-|tracking-|list-|decoration-)/g;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Rich metadata entry for a single file in the snapshot.
 * Stored as the value in the top-level snapshot Record.
 */
export interface SnapshotEntry {
  /** Full UTF-8 file contents */
  contents: string;
  /** Total number of lines */
  lines: number;
  /** File size in kilobytes, rounded to 2 decimal places */
  sizeKb: number;
  /** ISO 8601 timestamp of the file's last modification time */
  lastModified: string;
  /**
   * Broad architectural layer derived from the second path segment.
   * e.g. "src/components/..." → "components"
   */
  layer: string;
  /**
   * Optional sublayer derived from the third path segment when present.
   * e.g. "src/components/sectional/..." → "sectional"
   * Empty string when there is no meaningful sublayer.
   */
  sublayer: string;
  /**
   * Array of tags derived from path structure.
   * Always includes layer; includes sublayer and extension when present.
   * e.g. ["components", "sectional", ".astro"]
   */
  tags: string[];
  /** Number of // TODO or // FIXME comments found in the file */
  todoCount: number;
  /**
   * Whether the file contains at least one JSDoc block comment.
   * null for file types where JSDoc is not applicable (e.g. .css, .json).
   */
  hasJSDoc: boolean | null;
  /**
   * Count of Tailwind utility class occurrences.
   * null for file types where Tailwind is not applicable (e.g. .ts, .json).
   */
  utilityClassCount: number | null;
}

// ---------------------------------------------------------------------------
// Path-based metadata helpers
// ---------------------------------------------------------------------------

/**
 * Derives the broad architectural layer from a repo-relative file path.
 * Uses the second path segment (index 1) which corresponds to the
 * directory immediately inside `src/`.
 *
 * @param filePath - Repo-relative path, e.g. "src/components/ui/Card.astro"
 * @returns Layer label, e.g. "components". Falls back to "root" if no
 *          second segment exists (e.g. files directly in src/).
 */
function layerFromPath(filePath: string): string {
  const parts = filePath.split("/");
  // parts[0] = "src", parts[1] = layer directory
  return parts[1] ?? "root";
}

/**
 * Derives an optional sublayer from a repo-relative file path.
 * Uses the third path segment (index 2) when it is a directory name
 * (i.e. not a filename with an extension).
 *
 * @param filePath - Repo-relative path, e.g. "src/components/sectional/Hero.astro"
 * @returns Sublayer label, e.g. "sectional". Empty string when there is no
 *          meaningful sublayer (file is directly inside the layer directory).
 */
function sublayerFromPath(filePath: string): string {
  const parts = filePath.split("/");
  // parts[2] exists and has no extension → it's a subdirectory name
  if (parts[2] && !path.extname(parts[2])) {
    return parts[2];
  }
  return "";
}

/**
 * Builds the tags array for a file from its path structure.
 * Tags are always path-derived and objective — no thresholds or heuristics.
 *
 * Tag composition:
 *   1. layer  — always present
 *   2. sublayer — present when the file lives in a subdirectory of its layer
 *   3. extension — the file extension, e.g. ".astro"
 *
 * @param filePath  - Repo-relative file path.
 * @param layer     - Pre-computed layer label.
 * @param sublayer  - Pre-computed sublayer label (empty string if none).
 * @param extension - File extension including the leading dot.
 * @returns Deduplicated array of tag strings.
 */
function buildTags(
  filePath: string,
  layer: string,
  sublayer: string,
  extension: string
): string[] {
  const tags: string[] = [layer];
  if (sublayer) tags.push(sublayer);
  tags.push(extension);
  return tags;
}

// ---------------------------------------------------------------------------
// Content metric helpers
// ---------------------------------------------------------------------------

/**
 * Counts the number of TODO and FIXME comments in a file's contents.
 * Matches both `// TODO` and `// FIXME` in any casing.
 *
 * @param contents - Full UTF-8 file contents.
 * @returns Count of matched TODO/FIXME occurrences.
 */
function countTodos(contents: string): number {
  const matches = contents.match(/\/\/\s*(TODO|FIXME)/gi);
  return matches ? matches.length : 0;
}

/**
 * Checks whether a file contains at least one JSDoc block comment (`/**`).
 * Returns null for file types where JSDoc is not applicable.
 *
 * @param contents  - Full UTF-8 file contents.
 * @param extension - File extension including the leading dot.
 * @returns true if JSDoc present, false if absent, null if not applicable.
 */
function checkHasJSDoc(contents: string, extension: string): boolean | null {
  if (!JSDOC_EXTS.has(extension)) return null;
  return contents.includes("/**");
}

/**
 * Counts Tailwind utility class occurrences in a file.
 * Returns null for file types where Tailwind is not applicable.
 *
 * Uses a prefix-based regex rather than a full class list, so it may
 * slightly over-count in files with coincidental prefix matches — but
 * it is fast and good enough for relative comparison across files.
 *
 * @param contents  - Full UTF-8 file contents.
 * @param extension - File extension including the leading dot.
 * @returns Count of utility class occurrences, or null if not applicable.
 */
function countUtilityClasses(contents: string, extension: string): number | null {
  if (!TAILWIND_EXTS.has(extension)) return null;
  const matches = contents.match(TAILWIND_PREFIXES);
  return matches ? matches.length : 0;
}

// ---------------------------------------------------------------------------
// Core logic
// ---------------------------------------------------------------------------

/**
 * Recursively collects all files under `dir` whose extension is in
 * `SNAPSHOT_EXTS`, skipping any directory whose base name is in
 * `IGNORE_DIRS`.
 *
 * @param dir - Absolute path of the directory to walk.
 * @returns Array of absolute file paths.
 */
function collectFiles(dir: string): string[] {
  const results: string[] = [];

  /** Inner recursive walker — keeps `results` in the closure. */
  function walk(current: string): void {
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name)) {
          walk(fullPath);
        }
        continue;
      }

      if (entry.isFile() && SNAPSHOT_EXTS.has(path.extname(entry.name))) {
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

/**
 * Builds a rich snapshot record mapping each file's repo-relative path
 * to a `SnapshotEntry` containing its contents and computed metadata.
 *
 * @param files - Array of absolute file paths to process.
 * @returns Record suitable for JSON serialisation.
 */
function buildSnapshot(files: string[]): Record<string, SnapshotEntry> {
  const snapshot: Record<string, SnapshotEntry> = {};

  for (const filePath of files) {
    const relativePath = path.relative(REPO_ROOT, filePath);
    const extension = path.extname(filePath);

    try {
      const contents = fs.readFileSync(filePath, "utf-8");
      const stat = fs.statSync(filePath);

      const layer = layerFromPath(relativePath);
      const sublayer = sublayerFromPath(relativePath);
      const tags = buildTags(relativePath, layer, sublayer, extension);

      snapshot[relativePath] = {
        contents,
        lines: contents.split("\n").length,
        sizeKb: parseFloat((Buffer.byteLength(contents, "utf-8") / 1024).toFixed(2)),
        lastModified: stat.mtime.toISOString(),
        layer,
        sublayer,
        tags,
        todoCount: countTodos(contents),
        hasJSDoc: checkHasJSDoc(contents, extension),
        utilityClassCount: countUtilityClasses(contents, extension),
      };
    } catch (err) {
      console.warn(`[snapshot] Could not process ${relativePath}:`, err);
    }
  }

  return snapshot;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * Main entry point.
 * Collects files from all configured directories, builds the rich snapshot
 * record, and writes it to SNAPSHOT_OUT as formatted JSON.
 */
function main(): void {
  console.log("[snapshot] Scanning directories:", SNAPSHOT_DIRS);
  console.log("[snapshot] Including extensions:", [...SNAPSHOT_EXTS].join(", "));

  const allFiles: string[] = [];

  for (const dir of SNAPSHOT_DIRS) {
    const absDir = path.resolve(REPO_ROOT, dir);

    if (!fs.existsSync(absDir)) {
      console.warn(`[snapshot] Directory not found, skipping: ${absDir}`);
      continue;
    }

    const files = collectFiles(absDir);
    console.log(`[snapshot] ${dir}/ → ${files.length} files`);
    allFiles.push(...files);
  }

  if (allFiles.length === 0) {
    console.error("[snapshot] No files found. Exiting.");
    process.exit(1);
  }

  const snapshot = buildSnapshot(allFiles);
  const json = JSON.stringify(snapshot, null, 2);

  fs.writeFileSync(SNAPSHOT_OUT, json, "utf-8");

  const sizeKb = (Buffer.byteLength(json, "utf-8") / 1024).toFixed(1);
  console.log(
    `[snapshot] Done. ${allFiles.length} files → ${SNAPSHOT_OUT} (${sizeKb} KB)`
  );
}

main();