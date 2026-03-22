export const THEMES = {
  twilight: {
    id: "twilight", name: "Twilight Ink", icon: "☽",
    bg: "#111620", bg2: "#171D2A", bg3: "#1D2535", surface: "#151B28", surfaceHover: "#192132",
    border: "rgba(196,162,101,0.06)", borderActive: "rgba(196,162,101,0.16)",
    gold: "#C4A265", goldSoft: "rgba(196,162,101,0.1)", accent: "#C06A30", accentSoft: "rgba(192,106,48,0.08)",
    text: "#E4DED2", text2: "#B8B0A2", text3: "#7A7468", text4: "#4E4A42",
    green: "#6A9A60", red: "#C45A4A", blue: "#5A8AB4", plum: "#9A70A0", teal: "#4EA8A0",
    hd: "'Cormorant Garamond',Georgia,serif",
    body: "'Source Serif 4',Georgia,serif",
    ui: "'Outfit',system-ui,sans-serif",
    mono: "'JetBrains Mono',monospace",
    shadow: "0 2px 8px rgba(0,0,0,.35)", shadowLg: "0 8px 32px rgba(0,0,0,.45)",
  },
  parchment: {
    id: "parchment", name: "Warm Parchment", icon: "☀",
    bg: "#F4F0E6", bg2: "#ECE8DD", bg3: "#E2DDD1", surface: "#FFFDF5", surfaceHover: "#FAF7EE",
    border: "rgba(140,120,80,0.1)", borderActive: "rgba(140,120,80,0.24)",
    gold: "#A87A0A", goldSoft: "rgba(168,122,10,0.07)", accent: "#B85A32", accentSoft: "rgba(184,90,50,0.06)",
    text: "#2A2218", text2: "#4A4030", text3: "#8A7E6A", text4: "#B8AD98",
    green: "#5A7A4A", red: "#A0422E", blue: "#4A6A8A", plum: "#7A5070", teal: "#3A8A7A",
    hd: "'Cormorant Garamond',Georgia,serif",
    body: "'Source Serif 4',Georgia,serif",
    ui: "'Outfit',system-ui,sans-serif",
    mono: "'JetBrains Mono',monospace",
    shadow: "0 1px 4px rgba(80,60,20,.05)", shadowLg: "0 6px 24px rgba(80,60,20,.06)",
  },
  stone: {
    id: "stone", name: "Stone & Sage", icon: "◑",
    bg: "#E6E4DE", bg2: "#DCDAD2", bg3: "#D0CEC4", surface: "#F0EEE8", surfaceHover: "#EAE8E1",
    border: "rgba(100,96,82,0.1)", borderActive: "rgba(100,96,82,0.22)",
    gold: "#7A6E42", goldSoft: "rgba(122,110,66,0.07)", accent: "#A85A3A", accentSoft: "rgba(168,90,58,0.06)",
    text: "#28261E", text2: "#44423A", text3: "#78756C", text4: "#A09C92",
    green: "#4A7A56", red: "#A0493A", blue: "#506A80", plum: "#7A5A6A", teal: "#3A8878",
    hd: "'Cormorant Garamond',Georgia,serif",
    body: "'Source Serif 4',Georgia,serif",
    ui: "'Outfit',system-ui,sans-serif",
    mono: "'JetBrains Mono',monospace",
    shadow: "0 1px 4px rgba(60,56,40,.05)", shadowLg: "0 6px 24px rgba(60,56,40,.06)",
  },
  editorial: {
    id: "editorial", name: "Editorial", icon: "■",
    bg: "#F9F9F7", bg2: "#F0EFEC", bg3: "#E4E3DE", surface: "#FFFFFF", surfaceHover: "#FBFBF9",
    border: "rgba(0,0,0,0.05)", borderActive: "rgba(0,0,0,0.12)",
    gold: "#1A1A18", goldSoft: "rgba(0,0,0,0.03)", accent: "#C44A20", accentSoft: "rgba(196,74,32,0.05)",
    text: "#1A1A18", text2: "#3A3A36", text3: "#7A7A74", text4: "#AAAAAA",
    green: "#2A6A4A", red: "#C44A20", blue: "#2A4A7A", plum: "#6A3A6A", teal: "#2A7A6A",
    hd: "'Cormorant Garamond',Georgia,serif",
    body: "'Source Serif 4',Georgia,serif",
    ui: "'Outfit',system-ui,sans-serif",
    mono: "'JetBrains Mono',monospace",
    shadow: "0 1px 3px rgba(0,0,0,.03)", shadowLg: "0 4px 16px rgba(0,0,0,.04)",
  },
};

export const THEME_ORDER = ["twilight", "parchment", "stone", "editorial"];

export const TIERS = [
  { name: "Fresh Ink", min: 0,    color: "#8A8474" },
  { name: "Wet Ink",   min: 25,   color: "#7AAAB8" },
  { name: "Set Ink",   min: 100,  color: "#7AAA80" },
  { name: "Deep Ink",  min: 500,  color: "#C4A265" },
  { name: "Indelible", min: 2000, color: "#C06A30" },
];

export function getTier(n) {
  for (let i = TIERS.length - 1; i >= 0; i--)
    if (n >= TIERS[i].min) return TIERS[i];
  return TIERS[0];
}

export function fmtN(n) {
  if (n >= 10000) return (n / 1000).toFixed(0) + "k";
  if (n >= 1000)  return (n / 1000).toFixed(1) + "k";
  return String(n);
}

export const LENSES = {
  analyst:     { icon: "🔬", label: "Analyst",     color: "#5B9BD5" },
  empath:      { icon: "💖", label: "Empath",      color: "#D4788C" },
  philosopher: { icon: "💡", label: "Philosopher", color: "#D4A855" },
  storyteller: { icon: "🎭", label: "Storyteller", color: "#9B7ED4" },
  explorer:    { icon: "🗺️", label: "Explorer",    color: "#5BAD7A" },
  alchemist:   { icon: "✧",  label: "Alchemist",   color: "#C4A06A" },
};

export const POST_TYPES = {
  original:       { label: "Original",  icon: "✎", colorKey: "accent" },
  review:         { label: "Review",    icon: "◈", colorKey: "gold" },
  recommendation: { label: "Rec",       icon: "⬨", colorKey: "green" },
  spoiler:        { label: "Spoiler",   icon: "⚠", colorKey: "red" },
};

export const GENRE_TAGS = {
  fiction: ["Literary Fiction","Contemporary","Historical","Magical Realism","Dystopian","Romance","Thriller","Horror","Sci-Fi","Fantasy"],
  nonfiction: ["Memoir","Essay","Biography","History","Philosophy","Science","Politics","Self-Help"],
  poetry: ["Poetry","Prose Poetry","Haiku","Narrative Poetry"],
};

export const MOOD_TAGS = ["Contemplative","Devastating","Life-Affirming","Unsettling","Funny","Tender","Challenging","Meditative","Urgent","Dreamlike"];

// Compat alias
export function fmtNum(n) { return fmtN(n); }
