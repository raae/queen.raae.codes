import satori from "satori";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const WIDTH = 1200;
const HEIGHT = 628;
const BG = "#fdf6ec";
const ACCENT = "#f4511e";
const TEXT = "#4a1638";
const GOLD = "#ffde59";
const GREEN = "#16a34a";

const assetsDir = path.resolve(process.cwd(), "src/assets/og");
const loadFont = (n: string) => fs.readFileSync(path.join(assetsDir, n));
const avatarUri = (f: string) => {
  const buf = fs.readFileSync(path.join(assetsDir, f));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
};

// Emoji loader for Satori
const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;
function toCodePoint(s: string): string {
  const r: string[] = []; let c = 0, p = 0, i = 0;
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
  try {
    const res = await fetch(`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code.toLowerCase()}.svg`);
    if (!res.ok) return "";
    const svg = await res.text(); emojiCache.set(code, svg); return svg;
  } catch { return ""; }
}

const fonts = () => [
  { name: "Lora", data: loadFont("Lora-Regular.woff"), weight: 400 as const, style: "normal" as const },
  { name: "Montserrat", data: loadFont("Montserrat-Black.ttf"), weight: 900 as const, style: "normal" as const },
  { name: "Montserrat", data: loadFont("Montserrat-Regular.ttf"), weight: 400 as const, style: "normal" as const },
  { name: "Montserrat", data: loadFont("Montserrat-SemiBold.woff"), weight: 600 as const, style: "normal" as const },
];

const emojiLoader = async (code: string, segment: string) => {
  if (code === "emoji") return `data:image/svg+xml;base64,${Buffer.from(await loadEmoji(getIconCode(segment))).toString("base64")}`;
  return code;
};

async function render(markup: any): Promise<Buffer> {
  const svg = await satori(markup, { width: WIDTH, height: HEIGHT, fonts: fonts(), loadAdditionalAsset: emojiLoader });
  return await sharp(Buffer.from(svg)).png().toBuffer();
}

function img(src: string, style: Record<string, any>) {
  return { type: "img", props: { src, style: { objectFit: "cover", ...style } } };
}
function text(children: string, style: Record<string, any>) {
  return { type: "div", props: { children, style } };
}
function box(style: Record<string, any>, children: any) {
  const s = { display: "flex", ...style };
  return { type: "div", props: { style: s, children } };
}

const queen = () => avatarUri("queen-avatar.jpg");
const crab = () => avatarUri("jeanclaw-avatar.jpg");

// ── Quiz OG image: dual avatars matching regular OG geometry ──
export async function generateQuizOgImage(): Promise<Buffer> {
  // Exact geometry from og-image.ts (regular posts)
  const AVATAR_DIAMETER = HEIGHT; // 628px
  const AVATAR_RADIUS = AVATAR_DIAMETER / 2; // 314px
  const AVATAR_BORDER = Math.round(HEIGHT * 0.03); // ~19px
  const AVATAR_CX_RIGHT = WIDTH - AVATAR_RADIUS * 0.5; // 1043 — crab (right)
  const AVATAR_CY = AVATAR_RADIUS * 1.2; // 376.8
  const AVATAR_CX_LEFT = AVATAR_RADIUS * 0.5; // 157 — queen (mirrored)

  return render(box({ display: "flex", flexDirection: "column", width: `${WIDTH}px`, height: `${HEIGHT}px`, backgroundColor: BG, overflow: "hidden", position: "relative" }, [
    img(queen(), { position: "absolute", top: `${Math.round(AVATAR_CY - AVATAR_RADIUS)}px`, left: `${Math.round(AVATAR_CX_LEFT - AVATAR_RADIUS)}px`, width: `${AVATAR_DIAMETER}px`, height: `${AVATAR_DIAMETER}px`, borderRadius: "50%", border: `${AVATAR_BORDER}px solid ${GOLD}` }),
    img(crab(), { position: "absolute", top: `${Math.round(AVATAR_CY - AVATAR_RADIUS)}px`, left: `${Math.round(AVATAR_CX_RIGHT - AVATAR_RADIUS)}px`, width: `${AVATAR_DIAMETER}px`, height: `${AVATAR_DIAMETER}px`, borderRadius: "50%", border: `${AVATAR_BORDER}px solid ${GREEN}` }),
    box({ width: "100%", height: "12px", backgroundColor: ACCENT }, []),
    box({ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }, [
      text("WHO SAID IT?", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "56px", color: TEXT, backgroundColor: BG, padding: "6px 28px", borderRadius: "16px", lineHeight: 1 }),
      text("Queen  vs  Jean-Claw (AI)", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "30px", color: ACCENT, backgroundColor: BG, padding: "8px 20px", borderRadius: "12px", marginTop: "10px" }),
      text("Can you tell the difference?", { fontFamily: "Lora", fontSize: "22px", color: TEXT, backgroundColor: BG, padding: "4px 16px", borderRadius: "10px", marginTop: "6px" }),
    ]),
    box({ display: "flex", padding: "0 0 18px 0", justifyContent: "center", position: "relative" }, text("queen.raae.codes", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "18px", color: ACCENT, backgroundColor: BG, padding: "4px 14px", borderRadius: "10px" })),
  ]));
}

// Keep backward compat alias
export const variant6 = generateQuizOgImage;
