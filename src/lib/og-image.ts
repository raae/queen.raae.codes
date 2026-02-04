import satori from "satori";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

// ── Author config matching Gatsby plugin ──────────────────────────
export const AUTHOR_CONFIG: Record<string, { secondaryColor: string; avatar: string; signature: string }> = {
  Queen: {
    secondaryColor: "#ffde59",
    avatar: "queen-avatar.jpg",
    signature: "queen.raae.codes",
  },
  OlaVea: {
    secondaryColor: "#5DADE2",
    avatar: "olavea-avatar.jpg",
    signature: "Cap'n Ola (queen.raae.codes)",
  },
};

// ── Design constants (matching Gatsby canvas) ─────────────────────
const WIDTH = 1200;
const HEIGHT = 628;
const BG_COLOR = "#fffaf0";
const PRIMARY_COLOR = "#ec4326";
const PRIMARY_TEXT = "#412f20";
const SECONDARY_TEXT = "#412f20bb";

// ── Cached assets (loaded once per build) ─────────────────────────
const assetsDir = path.resolve(process.cwd(), "src/assets/og");

let fontRegular: Buffer | null = null;
let fontBold: Buffer | null = null;
const avatarCache = new Map<string, string>();

function loadFonts() {
  if (!fontRegular) fontRegular = fs.readFileSync(path.join(assetsDir, "Roboto-Regular.ttf"));
  if (!fontBold) fontBold = fs.readFileSync(path.join(assetsDir, "Roboto-Bold.ttf"));
}

function getAvatarDataUri(filename: string): string {
  if (avatarCache.has(filename)) return avatarCache.get(filename)!;
  const buf = fs.readFileSync(path.join(assetsDir, filename));
  const uri = `data:image/jpeg;base64,${buf.toString("base64")}`;
  avatarCache.set(filename, uri);
  return uri;
}

// ── Emoji support (Twemoji SVGs via Satori's loadAdditionalAsset) ─
const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;

function toCodePoint(unicodeSurrogates: string): string {
  const r: string[] = [];
  let c = 0,
    p = 0,
    i = 0;
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16));
      p = 0;
    } else if (55296 <= c && c <= 56319) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
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
  const res = await fetch(url);
  const svg = await res.text();
  emojiCache.set(code, svg);
  return svg;
}

// ── Text truncation (Satori has no line-clamp) ────────────────────
function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const truncated = text.substring(0, maxChars);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "…";
}

// ── Deterministic image path for a post slug ──────────────────────
export function getOgImagePath(slug: string): string {
  const name = slug.replace(/^\/|\/$/g, "");
  return `/og/${name}.png`;
}

// ── Cache-busting URL (hash changes when title/description change) ─
export function getOgImageUrl(slug: string, title: string, description: string): string {
  const hash = createHash("md5").update(`${title}|${description}`).digest("hex").slice(0, 8);
  return `${getOgImagePath(slug)}?v=${hash}`;
}

// ── Generate the PNG buffer ───────────────────────────────────────
export async function generateOgImage(options: {
  title: string;
  description: string;
  author: string;
}): Promise<Buffer> {
  loadFonts();

  const config = AUTHOR_CONFIG[options.author] || AUTHOR_CONFIG.Queen;
  const avatarUri = getAvatarDataUri(config.avatar);
  const title = truncateText(options.title, 60);
  const description = truncateText(options.description, 220);

  // Gatsby-matching avatar geometry
  const AVATAR_DIAMETER = HEIGHT; // 628px — same as canvas height
  const AVATAR_RADIUS = AVATAR_DIAMETER / 2; // 314px
  const AVATAR_BORDER = Math.round(HEIGHT * 0.03); // ~19px
  const AVATAR_CX = WIDTH - AVATAR_RADIUS * 0.5; // 1043
  const AVATAR_CY = AVATAR_RADIUS * 1.2; // 376.8
  const COPY_WIDTH = Math.round(AVATAR_CX - AVATAR_RADIUS - WIDTH * 0.05 * 2); // 609

  // Build a plain VDOM object for Satori
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
        // Avatar — absolutely positioned, overflows right & bottom edges
        // Placed first so text paints on top (SVG paint order = DOM order)
        {
          type: "img",
          props: {
            src: avatarUri,
            style: {
              position: "absolute",
              top: `${Math.round(AVATAR_CY - AVATAR_RADIUS)}px`,
              left: `${Math.round(AVATAR_CX - AVATAR_RADIUS)}px`,
              width: `${AVATAR_DIAMETER}px`,
              height: `${AVATAR_DIAMETER}px`,
              borderRadius: `${AVATAR_RADIUS}px`,
              border: `${AVATAR_BORDER}px solid ${config.secondaryColor}`,
              objectFit: "cover",
            },
          },
        },
        // Red top border
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
        // Main content area
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: 1,
              padding: "48px 60px 0 60px",
            },
            children: [
              // Text column — allowed to overlap the avatar
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: `${COPY_WIDTH + 270}px`,
                    justifyContent: "center",
                    overflow: "hidden",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "Roboto",
                          fontWeight: 700,
                          fontSize: "48px",
                          color: PRIMARY_TEXT,
                          lineHeight: 1.2,
                          textWrap: "balance",
                          overflow: "hidden",
                          backgroundColor: BG_COLOR,
                          borderRadius: "20px",
                          padding: "18px 18px 18px 0",
                        },
                        children: title,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "Roboto",
                          fontSize: "24px",
                          color: SECONDARY_TEXT,
                          marginTop: "20px",
                          lineHeight: 1.35,
                          overflow: "hidden",
                          maxWidth: `${COPY_WIDTH}px`,
                        },
                        children: description,
                      },
                    },
                  ],
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
              padding: "0 60px 28px 60px",
              fontFamily: "Roboto",
              fontSize: "22px",
              color: PRIMARY_COLOR,
            },
            children: config.signature,
          },
        },
      ],
    },
  };

  const svg = await satori(markup as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Roboto", data: fontRegular!, weight: 400, style: "normal" },
      { name: "Roboto", data: fontBold!, weight: 700, style: "normal" },
    ],
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === "emoji") {
        return `data:image/svg+xml;base64,${Buffer.from(await loadEmoji(getIconCode(segment))).toString("base64")}`;
      }
      return code;
    },
  });

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
