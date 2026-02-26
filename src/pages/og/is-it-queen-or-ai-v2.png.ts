import type { APIRoute } from "astro";
import { variant2 } from "../../lib/og-quiz-variants";
export const GET: APIRoute = async () => new Response(await variant2(), { headers: { "Content-Type": "image/png" } });
