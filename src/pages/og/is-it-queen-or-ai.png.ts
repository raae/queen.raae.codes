import type { APIRoute } from "astro";
import { generateOgImage } from "../../lib/og-image";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: "Is it Queen or AI?",
    description:
      "Can you tell the difference? Test your ability to spot authentic Queen Raae quotes from AI-generated fakes.",
    author: "JeanClaw2026",
  });

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
