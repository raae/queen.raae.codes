import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const WIDTH = 1200;
const HEIGHT = 628;
const BG_COLOR = "#fdf6ec";
const PRIMARY_COLOR = "#f4511e";
const PRIMARY_TEXT = "#4a1638";

const assetsDir = path.resolve(process.cwd(), "src/assets/og");

function loadFont(name: string) {
  return fs.readFileSync(path.join(assetsDir, name));
}

function getAvatarDataUri(filename: string): string {
  const buf = fs.readFileSync(path.join(assetsDir, filename));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

// Emoji support for Satori
const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;

function toCodePoint(s: string): string {
  const r: string[] = [];
  let c = 0, p = 0, i = 0;
  while (i < s.length) {
    c = s.charCodeAt(i++);
    if (p) { r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16)); p = 0; }
    else if (55296 <= c && c <= 56319) { p = c; }
    else { r.push(c.toString(16)); }
  }
  return r.join("-");
}

function getIconCode(char: string): string {
  return toCodePoint(char.indexOf(U200D) < 0 ? char.replace(UFE0Fg, "") : char);
}

const emojiCache = new Map<string, string>();
async function loadEmoji(code: string): Promise<string> {
  if (emojiCache.has(code)) return emojiCache.get(code)!;
  const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code.toLowerCase()}.svg`;
  try {
    const res = await fetch(url);
    if (!res.ok) return "";
    const svg = await res.text();
    emojiCache.set(code, svg);
    return svg;
  } catch { return ""; }
}

export const GET: APIRoute = async () => {
  const fontBold = loadFont("Montserrat-Black.ttf");
  const fontRegular = loadFont("Montserrat-Regular.ttf");
  const fontLora = loadFont("Lora-Regular.woff");
  const fontSemiBold = loadFont("Montserrat-SemiBold.woff");

  const queenAvatar = getAvatarDataUri("queen-avatar.jpg");
  const crabAvatar = getAvatarDataUri("jeanclaw-avatar.jpg");

  // Same geometry as regular OG images
  const AVATAR_DIAMETER = HEIGHT; // 628px
  const AVATAR_RADIUS = AVATAR_DIAMETER / 2; // 314px
  const AVATAR_BORDER = Math.round(HEIGHT * 0.03); // ~19px
  const AVATAR_CX = WIDTH - AVATAR_RADIUS * 0.5; // 1043 — crab (right)
  const AVATAR_CY = AVATAR_RADIUS * 1.2; // 376.8
  const QUEEN_CX = AVATAR_RADIUS * 0.5; // 157 — queen (mirrored left)

  const markup = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        backgroundColor: BG_COLOR,
        overflow: "hidden",
      },
      children: [
        // Queen avatar — left (mirrored position)
        {
          type: "img",
          props: {
            src: queenAvatar,
            style: {
              position: "absolute",
              top: `${Math.round(AVATAR_CY - AVATAR_RADIUS)}px`,
              left: `${Math.round(QUEEN_CX - AVATAR_RADIUS)}px`,
              width: `${AVATAR_DIAMETER}px`,
              height: `${AVATAR_DIAMETER}px`,
              borderRadius: `${AVATAR_RADIUS}px`,
              border: `${AVATAR_BORDER}px solid #ffde59`,
              objectFit: "cover",
            },
          },
        },
        // Crab avatar — right (standard position)
        {
          type: "img",
          props: {
            src: crabAvatar,
            style: {
              position: "absolute",
              top: `${Math.round(AVATAR_CY - AVATAR_RADIUS)}px`,
              left: `${Math.round(AVATAR_CX - AVATAR_RADIUS)}px`,
              width: `${AVATAR_DIAMETER}px`,
              height: `${AVATAR_DIAMETER}px`,
              borderRadius: `${AVATAR_RADIUS}px`,
              border: `${AVATAR_BORDER}px solid #16a34a`,
              objectFit: "cover",
            },
          },
        },
        // Top accent bar
        {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: "12px",
              backgroundColor: PRIMARY_COLOR,
            },
          },
        },
        // Center content — title between the two avatars
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 60px",
              textAlign: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Montserrat",
                    fontWeight: 900,
                    fontSize: "58px",
                    color: PRIMARY_TEXT,
                    lineHeight: 1.1,
                    backgroundColor: BG_COLOR,
                    borderRadius: "20px",
                    padding: "16px 32px 12px",
                  },
                  children: "Is it Queen or AI?",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Lora",
                    fontSize: "24px",
                    color: "#3d1230",
                    marginTop: "14px",
                    lineHeight: 1.4,
                    backgroundColor: BG_COLOR,
                    borderRadius: "12px",
                    padding: "8px 24px",
                    maxWidth: "500px",
                  },
                  children: "Can you tell the difference? Take the quiz!",
                },
              },
            ],
          },
        },
        // Footer
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "center",
              padding: "0 60px 28px 60px",
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: "22px",
              color: PRIMARY_COLOR,
              backgroundColor: BG_COLOR,
              borderRadius: "12px",
            },
            children: "queen.raae.codes 👑🦀",
          },
        },
      ],
    },
  };

  const svg = await satori(markup as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Lora", data: fontLora, weight: 400, style: "normal" as const },
      { name: "Montserrat", data: fontBold, weight: 900, style: "normal" as const },
      { name: "Montserrat", data: fontSemiBold, weight: 600, style: "normal" as const },
      { name: "Montserrat", data: fontRegular, weight: 400, style: "normal" as const },
    ],
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === "emoji") {
        return `data:image/svg+xml;base64,${Buffer.from(await loadEmoji(getIconCode(segment))).toString("base64")}`;
      }
      return code;
    },
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
