import { readFileSync } from "fs";

const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_TOKEN = process.env.NOTION_TOKEN;

/** @type {Record<string, string>} */
const HEADERS = {
  "Authorization": `Bearer ${NOTION_TOKEN}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

/**
 * Queries Notion for all version strings already in the database.
 * Handles pagination so large changelogs don't miss anything.
 * @returns {Promise<Set<string>>}
 */
async function fetchExistingVersions() {
  const existing = new Set();
  let cursor = undefined;

  do {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;

    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Notion query failed: ${res.status} ${await res.text()}`);

    const data = await res.json();

    for (const page of data.results) {
      const v = page.properties?.Version?.rich_text?.[0]?.plain_text;
      if (v) existing.add(v);
    }

    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return existing;
}

/**
 * Creates a single Notion page row for one changelog entry.
 * @param {{ Version: string, Date: string, Type: string, Name: string, Notes: string[] }} entry
 * @returns {Promise<void>}
 */
async function createNotionPage(entry) {
  // Notes is an array in changelog.json — join into a single string for Notion.
  const notesText = Array.isArray(entry.Notes)
    ? entry.Notes.map((note) => `• ${note}`).join("\n")
    : (entry.Notes ?? "");

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      parent: { database_id: DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: entry.Name } }],
        },
        Version: {
          rich_text: [{ text: { content: entry.Version } }],
        },
        Date: {
          date: { start: entry.Date },
        },
        Type: {
          select: { name: entry.Type },
        },
        Notes: {
          rich_text: [{ text: { content: notesText } }],
        },
      },
    }),
  });

  if (!res.ok) throw new Error(`Failed to create page for ${entry.Version}: ${res.status} ${await res.text()}`);
}

/**
 * Main — reads changelog, diffs against Notion, pushes only new entries.
 * @returns {Promise<void>}
 */
async function main() {
  const raw = readFileSync("changelog.json", "utf-8");
  const parsed = JSON.parse(raw);

  // changelog.json is shaped as { versions: [...], unreleased: [] }
  // so we pull the versions array rather than treating the whole object as an array.
  if (!parsed.versions || !Array.isArray(parsed.versions)) {
    throw new Error(
      `changelog.json must have a "versions" array at the top level. Keys found: ${Object.keys(parsed).join(", ")}`
    );
  }

  const changelog = parsed.versions;
  const existing = await fetchExistingVersions();

  // Property names in changelog.json are PascalCase (Version, Date, Type, Name)
  // so we match against entry.Version here.
  const toCreate = changelog.filter((entry) => !existing.has(entry.Version));

  if (toCreate.length === 0) {
    console.log("No new changelog entries to sync.");
    return;
  }

  console.log(`Syncing ${toCreate.length} new entries...`);

  for (const entry of toCreate) {
    await createNotionPage(entry);
    console.log(`  ✓ ${entry.Version} — ${entry.Name}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});