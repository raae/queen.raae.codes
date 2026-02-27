import type { APIRoute } from "astro";
import { variant6 } from "../../lib/og-quiz-variants";
export const GET: APIRoute = async () => new Response(await variant6(), { headers: { "Content-Type": "image/png" } });
