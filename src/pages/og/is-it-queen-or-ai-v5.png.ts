import type { APIRoute } from "astro";
import { variant5 } from "../../lib/og-quiz-variants";
export const GET: APIRoute = async () => new Response(await variant5(), { headers: { "Content-Type": "image/png" } });
