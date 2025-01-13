import { getThreeTopTestimonials, testimonials } from "./testimonials.ts";

async function handler(req: { url: string | URL; }) {
  const url = new URL(req.url);

  if (url.pathname === "/api/testimonials/top") {
    try {
      const topTestimonials = getThreeTopTestimonials(testimonials);
      return new Response(JSON.stringify(topTestimonials), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        status: 200,
      });
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return new Response(JSON.stringify({error: "Internal server error"}), {
        headers: {"Content-Type": "application/json"},
        status: 500
      });
    }
  }

  return new Response("Page not found", { status: 404 });
}

console.log(`🚀 Deno server running : http://localhost:8000`);
Deno.serve(handler);
