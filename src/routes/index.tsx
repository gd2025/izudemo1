import { createFileRoute } from "@tanstack/react-router";

// Homepage = the original IZU Paros HTML, served verbatim.
// The server handler returns the static file directly so the URL stays "/".
// Edit the design in public/legacy/index.html.
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const res = await fetch(`${url.origin}/legacy/index.html`);
        const html = await res.text();
        return new Response(html, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      },
    },
  },
  component: () => null,
});
