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

// ── Variant 1: Current (big centered text, circles bleed down) ──
export async function variant1(): Promise<Buffer> {
  const AVATAR_SIZE = 520, BLEED = 90, TOP = 114;
  return render(box({ display: "flex", flexDirection: "column", width: `${WIDTH}px`, height: `${HEIGHT}px`, backgroundColor: BG, overflow: "hidden", position: "relative" }, [
    img(queen(), { position: "absolute", top: `${TOP}px`, left: `${-BLEED}px`, width: `${AVATAR_SIZE}px`, height: `${AVATAR_SIZE}px`, borderRadius: "50%", border: `16px solid ${GOLD}` }),
    img(crab(), { position: "absolute", top: `${TOP}px`, right: `${-BLEED}px`, width: `${AVATAR_SIZE}px`, height: `${AVATAR_SIZE}px`, borderRadius: "50%", border: `16px solid ${GREEN}` }),
    box({ width: "100%", height: "12px", backgroundColor: ACCENT }, []),
    box({ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }, [
      text("👑 Queen  vs  Jean-Claw (AI) 🦀", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "26px", color: TEXT, backgroundColor: BG, padding: "6px 16px", borderRadius: "12px", marginBottom: "12px" }),
      text("WHO SAID IT?", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "72px", color: ACCENT, lineHeight: 1, backgroundColor: BG, padding: "10px 32px", borderRadius: "20px" }),
      text("Can you tell the difference?", { fontFamily: "Lora", fontSize: "24px", color: TEXT, marginTop: "14px", backgroundColor: BG, padding: "6px 20px", borderRadius: "12px" }),
    ]),
    box({ display: "flex", padding: "0 0 20px 0", justifyContent: "center", position: "relative" }, text("queen.raae.codes", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "20px", color: ACCENT, backgroundColor: BG, padding: "4px 18px", borderRadius: "12px" })),
  ]));
}

// ── Variant 2: Big VS between avatars at same level, title on top ──
export async function variant2(): Promise<Buffer> {
  const AV = 380, BLEED = 60, TOP = 160;
  return render(box({ display: "flex", flexDirection: "column", width: `${WIDTH}px`, height: `${HEIGHT}px`, backgroundColor: BG, overflow: "hidden", position: "relative" }, [
    img(queen(), { position: "absolute", top: `${TOP}px`, left: `${-BLEED}px`, width: `${AV}px`, height: `${AV}px`, borderRadius: "50%", border: `14px solid ${GOLD}` }),
    img(crab(), { position: "absolute", top: `${TOP}px`, right: `${-BLEED}px`, width: `${AV}px`, height: `${AV}px`, borderRadius: "50%", border: `14px solid ${GREEN}` }),
    box({ width: "100%", height: "12px", backgroundColor: ACCENT }, []),
    // Title top
    box({ display: "flex", justifyContent: "center", padding: "36px 0 0 0" },
      text("WHO SAID IT?", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "58px", color: ACCENT, lineHeight: 1 })
    ),
    // Big VS centered between avatars
    box({ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" },
      text("VS", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "140px", color: ACCENT, lineHeight: 1, opacity: 0.9 })
    ),
    // Bottom labels + subtitle
    box({ display: "flex", justifyContent: "space-between", padding: "0 100px", marginBottom: "4px" }, [
      text("👑 Queen", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "24px", color: TEXT, backgroundColor: BG, padding: "4px 12px", borderRadius: "10px" }),
      text("Can you tell the difference?", { fontFamily: "Lora", fontSize: "20px", color: TEXT }),
      text("Jean-Claw 🦀", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "24px", color: TEXT, backgroundColor: BG, padding: "4px 12px", borderRadius: "10px" }),
    ]),
    box({ display: "flex", padding: "0 0 18px 0", justifyContent: "center" }, text("queen.raae.codes", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "18px", color: ACCENT })),
  ]));
}

// ── Variant 3: Side by side with divider line, VS on divider ──
export async function variant3(): Promise<Buffer> {
  const AV = 320, BLEED = 50;
  return render(box({ display: "flex", flexDirection: "column", width: `${WIDTH}px`, height: `${HEIGHT}px`, backgroundColor: BG, overflow: "hidden", position: "relative" }, [
    // Left avatar bleeds off bottom-left
    img(queen(), { position: "absolute", bottom: `${-BLEED}px`, left: `${-BLEED}px`, width: `${AV}px`, height: `${AV}px`, borderRadius: "50%", border: `14px solid ${GOLD}` }),
    // Right avatar bleeds off bottom-right
    img(crab(), { position: "absolute", bottom: `${-BLEED}px`, right: `${-BLEED}px`, width: `${AV}px`, height: `${AV}px`, borderRadius: "50%", border: `14px solid ${GREEN}` }),
    // Center divider line
    box({ position: "absolute", top: "80px", left: "598px", width: "4px", height: `${HEIGHT - 80}px`, backgroundColor: ACCENT, opacity: 0.3 }, []),
    // Top bar
    box({ width: "100%", height: "12px", backgroundColor: ACCENT }, []),
    // Title
    box({ display: "flex", justifyContent: "center", padding: "40px 0 0 0" },
      text("WHO SAID IT?", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "64px", color: ACCENT, lineHeight: 1 })
    ),
    // VS on divider
    box({ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" },
      text("VS", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "80px", color: ACCENT, backgroundColor: BG, padding: "0 20px", lineHeight: 1 })
    ),
    // Labels
    box({ display: "flex", justifyContent: "space-between", padding: "0 60px 24px 60px" }, [
      text("👑 Queen", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "28px", color: TEXT, backgroundColor: BG, padding: "4px 14px", borderRadius: "10px" }),
      text("queen.raae.codes", { fontFamily: "Montserrat", fontWeight: 600, fontSize: "18px", color: ACCENT }),
      text("Jean-Claw (AI) 🦀", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "28px", color: TEXT, backgroundColor: BG, padding: "4px 14px", borderRadius: "10px" }),
    ]),
  ]));
}

// ── Variant 4: Names under avatars, large VS dead center ──
export async function variant4(): Promise<Buffer> {
  const AV = 280, BLEED = 40;
  return render(box({ display: "flex", flexDirection: "column", width: `${WIDTH}px`, height: `${HEIGHT}px`, backgroundColor: BG, overflow: "hidden", position: "relative" }, [
    box({ width: "100%", height: "12px", backgroundColor: ACCENT }, []),
    box({ display: "flex", flex: 1, alignItems: "center", padding: "0 40px" }, [
      // Queen column
      box({ display: "flex", flexDirection: "column", alignItems: "center", width: "340px" }, [
        img(queen(), { width: `${AV}px`, height: `${AV}px`, borderRadius: "50%", border: `12px solid ${GOLD}` }),
        text("👑 Queen", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "28px", color: TEXT, marginTop: "12px" }),
      ]),
      // Center
      box({ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }, [
        text("VS", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "100px", color: ACCENT, lineHeight: 1 }),
        text("WHO SAID IT?", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "32px", color: TEXT, marginTop: "8px" }),
        text("Can you tell the difference?", { fontFamily: "Lora", fontSize: "20px", color: TEXT, marginTop: "8px" }),
      ]),
      // Jean-Claw column
      box({ display: "flex", flexDirection: "column", alignItems: "center", width: "340px" }, [
        img(crab(), { width: `${AV}px`, height: `${AV}px`, borderRadius: "50%", border: `12px solid ${GREEN}` }),
        text("Jean-Claw 🦀", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "28px", color: TEXT, marginTop: "12px" }),
      ]),
    ]),
    box({ display: "flex", padding: "0 0 16px 0", justifyContent: "center" }, text("queen.raae.codes", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "18px", color: ACCENT })),
  ]));
}

// ── Variant 6: Like v5 text, but circles match regular OG image geometry ──
export async function variant6(): Promise<Buffer> {
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
      text("👑", { fontSize: "48px", marginBottom: "4px" }),
      text("WHO SAID IT?", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "56px", color: TEXT, backgroundColor: BG, padding: "6px 28px", borderRadius: "16px", lineHeight: 1 }),
      text("Queen  vs  Jean-Claw", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "30px", color: ACCENT, backgroundColor: BG, padding: "8px 20px", borderRadius: "12px", marginTop: "10px" }),
      text("Can you tell the difference?", { fontFamily: "Lora", fontSize: "22px", color: TEXT, backgroundColor: BG, padding: "4px 16px", borderRadius: "10px", marginTop: "6px" }),
    ]),
    box({ display: "flex", padding: "0 0 18px 0", justifyContent: "center", position: "relative" }, text("queen.raae.codes", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "18px", color: ACCENT, backgroundColor: BG, padding: "4px 14px", borderRadius: "10px" })),
  ]));
}

// ── Variant 5: Large bleed, compact stacked center ──
export async function variant5(): Promise<Buffer> {
  const AV = 580, BLEED = 120, TOP = 100;
  return render(box({ display: "flex", flexDirection: "column", width: `${WIDTH}px`, height: `${HEIGHT}px`, backgroundColor: BG, overflow: "hidden", position: "relative" }, [
    img(queen(), { position: "absolute", top: `${TOP}px`, left: `${-BLEED}px`, width: `${AV}px`, height: `${AV}px`, borderRadius: "50%", border: `16px solid ${GOLD}` }),
    img(crab(), { position: "absolute", top: `${TOP}px`, right: `${-BLEED}px`, width: `${AV}px`, height: `${AV}px`, borderRadius: "50%", border: `16px solid ${GREEN}` }),
    box({ width: "100%", height: "12px", backgroundColor: ACCENT }, []),
    box({ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }, [
      text("👑", { fontSize: "48px", marginBottom: "4px" }),
      text("WHO SAID IT?", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "56px", color: TEXT, backgroundColor: BG, padding: "6px 28px", borderRadius: "16px", lineHeight: 1 }),
      text("Queen  vs  Jean-Claw", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "30px", color: ACCENT, backgroundColor: BG, padding: "8px 20px", borderRadius: "12px", marginTop: "10px" }),
      text("Can you tell the difference?", { fontFamily: "Lora", fontSize: "22px", color: TEXT, backgroundColor: BG, padding: "4px 16px", borderRadius: "10px", marginTop: "6px" }),
    ]),
    box({ display: "flex", padding: "0 0 18px 0", justifyContent: "center", position: "relative" }, text("queen.raae.codes", { fontFamily: "Montserrat", fontWeight: 900, fontSize: "18px", color: ACCENT, backgroundColor: BG, padding: "4px 14px", borderRadius: "10px" })),
  ]));
}
