import { createFileRoute } from "@tanstack/react-router";
// Import the original IZU Paros HTML as a raw string at build time.
// This works in the Worker runtime (no filesystem access needed).
// Edit the design in src/legacy/index.html.
import legacyHtml from "../legacy/index.html?raw";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(legacyHtml, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      },
    },
  },
  component: () => null,
});
