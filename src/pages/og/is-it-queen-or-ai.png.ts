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

function loadFont(name: string): Buffer {
  return fs.readFileSync(path.join(assetsDir, name));
}

function getAvatarDataUri(filename: string): string {
  const buf = fs.readFileSync(path.join(assetsDir, filename));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

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

  const queenAvatar = getAvatarDataUri("queen-avatar.jpg");
  const jeanclawAvatar = getAvatarDataUri("jeanclaw-avatar.jpg");

  // Avatars bleed off left/right edges, centered vertically
  const AVATAR_SIZE = 520;
  const AVATAR_RADIUS = AVATAR_SIZE / 2;
  const AVATAR_BORDER = 16;
  const AVATAR_TOP = Math.round((HEIGHT - AVATAR_SIZE) / 2); // vertically centered
  const BLEED = Math.round(AVATAR_RADIUS * 0.35); // how much hangs off the edge

  const markup = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        backgroundColor: BG_COLOR,
        overflow: "hidden",
        position: "relative",
      },
      children: [
        // Queen avatar — bleeds off left
        {
          type: "img",
          props: {
            src: queenAvatar,
            style: {
              position: "absolute",
              top: `${AVATAR_TOP}px`,
              left: `${-BLEED}px`,
              width: `${AVATAR_SIZE}px`,
              height: `${AVATAR_SIZE}px`,
              borderRadius: `${AVATAR_RADIUS}px`,
              border: `${AVATAR_BORDER}px solid #ffde59`,
              objectFit: "cover",
            },
          },
        },
        // Jean-Claw avatar — bleeds off right
        {
          type: "img",
          props: {
            src: jeanclawAvatar,
            style: {
              position: "absolute",
              top: `${AVATAR_TOP}px`,
              right: `${-BLEED}px`,
              width: `${AVATAR_SIZE}px`,
              height: `${AVATAR_SIZE}px`,
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
        // Center content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            },
            children: [
              // "Queen" label
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Montserrat",
                    fontWeight: 900,
                    fontSize: "26px",
                    color: PRIMARY_TEXT,
                    backgroundColor: BG_COLOR,
                    padding: "6px 16px",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  },
                  children: "Queen 👑  vs  AI 🦀",
                },
              },
              // Big title
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Montserrat",
                    fontWeight: 900,
                    fontSize: "72px",
                    color: PRIMARY_COLOR,
                    lineHeight: 1,
                    backgroundColor: BG_COLOR,
                    padding: "10px 32px",
                    borderRadius: "20px",
                  },
                  children: "WHO SAID IT?",
                },
              },
              // Subtitle
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Lora",
                    fontSize: "24px",
                    color: PRIMARY_TEXT,
                    marginTop: "14px",
                    backgroundColor: BG_COLOR,
                    padding: "6px 20px",
                    borderRadius: "12px",
                  },
                  children: "Can you tell the difference?",
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
              padding: "0 0 20px 0",
              justifyContent: "center",
              position: "relative",
            },
            children: {
              type: "div",
              props: {
                style: {
                  fontFamily: "Montserrat",
                  fontWeight: 900,
                  fontSize: "20px",
                  color: PRIMARY_COLOR,
                  backgroundColor: BG_COLOR,
                  padding: "4px 18px",
                  borderRadius: "12px",
                },
                children: "queen.raae.codes",
              },
            },
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
