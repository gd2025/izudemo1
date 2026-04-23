import { createFileRoute } from "@tanstack/react-router";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Homepage = the original IZU Paros HTML, served verbatim.
// Read from disk on the server instead of self-fetching (self-fetch fails in dev).
// Edit the design in public/legacy/index.html.
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: async () => {
        const filePath = path.join(process.cwd(), "public", "legacy", "index.html");
        const html = await readFile(filePath, "utf-8");
        return new Response(html, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      },
    },
  },
  component: () => null,
});
