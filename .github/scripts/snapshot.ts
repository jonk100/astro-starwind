/**
 * @file snapshot.ts
 * @description Walks one or more source directories and writes a JSON file
 * mapping each file's repo-relative path to its full text contents.
 *
 * Configuration is driven entirely by environment variables so the same
 * script works locally and inside GitHub Actions without modification.
 *
 * Environment variables:
 *   SNAPSHOT_DIRS   Comma-separated list of directories to scan (default: "src")
 *   SNAPSHOT_OUT    Path to write the output JSON (default: "snapshot.json")
 *   SNAPSHOT_EXTS   Comma-separated file extensions to include
 *                   (default: ".astro,.ts,.css,.html,.json,.md")
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
 * in the tree (e.g. nested node_modules inside a workspace).
 */
const IGNORE_DIRS: Set<string> = new Set([
  "node_modules",
  ".git",
  "dist",
  ".astro",
  ".cache",
  "coverage",
]);

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
 * Builds a record mapping each file's repo-relative path to its UTF-8
 * contents.
 *
 * @param files - Array of absolute file paths to read.
 * @returns Plain object suitable for JSON serialisation.
 */
function buildSnapshot(files: string[]): Record<string, string> {
  const snapshot: Record<string, string> = {};

  for (const filePath of files) {
    const relativePath = path.relative(REPO_ROOT, filePath);
    try {
      snapshot[relativePath] = fs.readFileSync(filePath, "utf-8");
    } catch (err) {
      // Log and skip files that can't be read (e.g. permission errors)
      console.warn(`[snapshot] Could not read ${relativePath}:`, err);
    }
  }

  return snapshot;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * Main entry point.
 * Collects files from all configured directories, builds the snapshot
 * object, and writes it to SNAPSHOT_OUT as formatted JSON.
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