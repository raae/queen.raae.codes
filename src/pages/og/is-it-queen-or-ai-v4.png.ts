import type { APIRoute } from "astro";
import { variant4 } from "../../lib/og-quiz-variants";
export const GET: APIRoute = async () => new Response(await variant4(), { headers: { "Content-Type": "image/png" } });
