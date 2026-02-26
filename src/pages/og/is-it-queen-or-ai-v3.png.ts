import type { APIRoute } from "astro";
import { variant3 } from "../../lib/og-quiz-variants";
export const GET: APIRoute = async () => new Response(await variant3(), { headers: { "Content-Type": "image/png" } });
