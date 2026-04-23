import { createFileRoute } from "@tanstack/react-router";

// The homepage IS the original IZU Paros HTML, served verbatim.
// We use a server handler so the URL stays "/" while delivering the static file.
// Edit the design in public/legacy/index.html.
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const assetUrl = `${url.origin}/legacy/index.html`;
        const res = await fetch(assetUrl);
        const html = await res.text();
        return new Response(html, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      },
    },
  },
});
