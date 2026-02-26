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

  const queenAvatar = getAvatarDataUri("queen-avatar.jpg");
  const jeanclawAvatar = getAvatarDataUri("jeanclaw-avatar.jpg");

  const AVATAR_SIZE = 260;
  const AVATAR_RADIUS = AVATAR_SIZE / 2;
  const AVATAR_BORDER = 8;

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
        // Main content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 60px",
            },
            children: [
              // Queen side
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                  },
                  children: [
                    {
                      type: "img",
                      props: {
                        src: queenAvatar,
                        style: {
                          width: `${AVATAR_SIZE}px`,
                          height: `${AVATAR_SIZE}px`,
                          borderRadius: `${AVATAR_RADIUS}px`,
                          border: `${AVATAR_BORDER}px solid #ffde59`,
                          objectFit: "cover",
                        },
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "Montserrat",
                          fontWeight: 900,
                          fontSize: "32px",
                          color: PRIMARY_TEXT,
                          marginTop: "16px",
                        },
                        children: "Queen 👑",
                      },
                    },
                  ],
                },
              },
              // VS in the middle
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 24px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "Montserrat",
                          fontWeight: 900,
                          fontSize: "64px",
                          color: PRIMARY_COLOR,
                          lineHeight: 1,
                        },
                        children: "VS",
                      },
                    },
                  ],
                },
              },
              // AI side
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                  },
                  children: [
                    {
                      type: "img",
                      props: {
                        src: jeanclawAvatar,
                        style: {
                          width: `${AVATAR_SIZE}px`,
                          height: `${AVATAR_SIZE}px`,
                          borderRadius: `${AVATAR_RADIUS}px`,
                          border: `${AVATAR_BORDER}px solid #16a34a`,
                          objectFit: "cover",
                        },
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "Montserrat",
                          fontWeight: 900,
                          fontSize: "32px",
                          color: PRIMARY_TEXT,
                          marginTop: "16px",
                        },
                        children: "AI 🦀",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        // Subtitle
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "center",
              padding: "0 60px 8px 60px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Lora",
                    fontSize: "22px",
                    color: PRIMARY_TEXT,
                    textAlign: "center",
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
              padding: "0 60px 24px 60px",
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: "20px",
              color: PRIMARY_COLOR,
              justifyContent: "center",
            },
            children: "queen.raae.codes",
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
