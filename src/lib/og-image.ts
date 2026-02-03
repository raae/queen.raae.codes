import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// ── Author config matching Gatsby plugin ──────────────────────────
export const AUTHOR_CONFIG: Record<
  string,
  { secondaryColor: string; avatar: string; signature: string }
> = {
  Queen: {
    secondaryColor: '#ffde59',
    avatar: 'queen-avatar.jpg',
    signature: 'queen.raae.codes',
  },
  OlaVea: {
    secondaryColor: '#5DADE2',
    avatar: 'olavea-avatar.jpg',
    signature: "Cap'n Ola (queen.raae.codes)",
  },
};

// ── Design constants (matching Gatsby canvas) ─────────────────────
const WIDTH = 1200;
const HEIGHT = 628;
const BG_COLOR = '#fffaf0';
const PRIMARY_COLOR = '#ec4326';
const PRIMARY_TEXT = '#412f20';
const SECONDARY_TEXT = '#412f20bb';

// ── Cached assets (loaded once per build) ─────────────────────────
const assetsDir = path.resolve(process.cwd(), 'src/assets/og');

let fontRegular: Buffer | null = null;
let fontBold: Buffer | null = null;
const avatarCache = new Map<string, string>();

function loadFonts() {
  if (!fontRegular) fontRegular = fs.readFileSync(path.join(assetsDir, 'Roboto-Regular.ttf'));
  if (!fontBold) fontBold = fs.readFileSync(path.join(assetsDir, 'Roboto-Bold.ttf'));
}

function getAvatarDataUri(filename: string): string {
  if (avatarCache.has(filename)) return avatarCache.get(filename)!;
  const buf = fs.readFileSync(path.join(assetsDir, filename));
  const uri = `data:image/jpeg;base64,${buf.toString('base64')}`;
  avatarCache.set(filename, uri);
  return uri;
}

// ── Text truncation (Satori has no line-clamp) ────────────────────
function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const truncated = text.substring(0, maxChars);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '…';
}

// ── Deterministic image path for a post slug ──────────────────────
export function getOgImagePath(slug: string): string {
  const name = slug.replace(/^\/|\/$/g, '');
  return `/og/${name}.png`;
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
  const title = truncateText(options.title, 120);
  const description = truncateText(options.description, 220);

  // Build a plain VDOM object for Satori (avoids satori-html wrapping issues)
  const markup = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        backgroundColor: BG_COLOR,
      },
      children: [
        // Red top border
        {
          type: 'div',
          props: {
            style: {
              width: '100%',
              height: '12px',
              backgroundColor: PRIMARY_COLOR,
            },
          },
        },
        // Main content area
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flex: 1,
              padding: '48px 60px 0 60px',
            },
            children: [
              // Left: text
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'center',
                    paddingRight: '40px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Roboto',
                          fontWeight: 700,
                          fontSize: '48px',
                          color: PRIMARY_TEXT,
                          lineHeight: 1.2,
                          overflow: 'hidden',
                        },
                        children: title,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Roboto',
                          fontSize: '24px',
                          color: SECONDARY_TEXT,
                          marginTop: '20px',
                          lineHeight: 1.35,
                          overflow: 'hidden',
                        },
                        children: description,
                      },
                    },
                  ],
                },
              },
              // Right: avatar
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  },
                  children: {
                    type: 'img',
                    props: {
                      src: avatarUri,
                      style: {
                        width: '280px',
                        height: '280px',
                        borderRadius: '140px',
                        border: `8px solid ${config.secondaryColor}`,
                        objectFit: 'cover',
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        // Footer
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              padding: '0 60px 28px 60px',
              fontFamily: 'Roboto',
              fontSize: '22px',
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
      { name: 'Roboto', data: fontRegular!, weight: 400, style: 'normal' },
      { name: 'Roboto', data: fontBold!, weight: 700, style: 'normal' },
    ],
  });

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
