export const THEMES = {
  twilight: {
    id: 'twilight', name: 'Twilight Ink', icon: '☾',
    bg: '#161D2E', bg2: '#1C2438', bg3: '#232D44', card: '#1A2236', cardHover: '#1E2840',
    border: 'rgba(212,168,85,0.09)', borderHover: 'rgba(212,168,85,0.18)',
    gold: '#D4A855', goldDim: 'rgba(212,168,85,0.45)', goldGlow: 'rgba(212,168,85,0.08)',
    accent: '#C47232', accentHover: '#D4832F',
    ink: '#E8E2D6', ink2: '#C8C0B0', ink3: '#8A8474', ink4: '#6C685C',
    green: '#6A9A60', red: '#C45A4A', blue: '#5A8AB4', plum: '#9A70A0',
    teal: '#4EA8A0', rose: '#C47A8A', amber: '#D4A040',
    serif: "'Playfair Display',Georgia,serif",
    body: "'Source Serif 4',Georgia,serif",
    sans: "'DM Sans',system-ui,sans-serif",
  },
  parchment: {
    id: 'parchment', name: 'Warm Parchment', icon: '☀',
    bg: '#F7F3EC', bg2: '#EFEBE3', bg3: '#E7E1D6', card: '#FFFDF8', cardHover: '#FEFBF4',
    border: 'rgba(180,160,120,0.2)', borderHover: 'rgba(180,160,120,0.35)',
    gold: '#B68409', goldDim: 'rgba(184,134,11,0.5)', goldGlow: 'rgba(184,134,11,0.06)',
    accent: '#B85A32', accentHover: '#D06838',
    ink: '#2C2418', ink2: '#3D3226', ink3: '#7A6E5E', ink4: '#978B77',
    green: '#5A7A4A', red: '#A0422E', blue: '#4A6A8A', plum: '#7A5070',
    teal: '#3A8A7A', rose: '#A0506A', amber: '#C4851C',
    serif: "'Playfair Display',Georgia,serif",
    body: "'Source Serif 4',Georgia,serif",
    sans: "'DM Sans',system-ui,sans-serif",
  },
  stone: {
    id: 'stone', name: 'Stone & Sage', icon: '◑',
    bg: '#EDEBE6', bg2: '#E2DFD8', bg3: '#D6D2CA', card: '#F5F3EE', cardHover: '#F0EDE6',
    border: 'rgba(140,130,110,0.22)', borderHover: 'rgba(140,130,110,0.38)',
    gold: '#8A7A4A', goldDim: 'rgba(138,122,74,0.5)', goldGlow: 'rgba(138,122,74,0.07)',
    accent: '#B05A3A', accentHover: '#C86842',
    ink: '#2A2A24', ink2: '#3E3E36', ink3: '#72706A', ink4: '#8B877D',
    green: '#4A7A56', red: '#A0493A', blue: '#506A80', plum: '#7A5A6A',
    teal: '#3A8878', rose: '#8A5060', amber: '#B87A30',
    serif: "'Playfair Display',Georgia,serif",
    body: "'Source Serif 4',Georgia,serif",
    sans: "'DM Sans',system-ui,sans-serif",
  },
  editorial: {
    id: 'editorial', name: 'Editorial Mono', icon: '■',
    bg: '#FAF9F7', bg2: '#F2F0EC', bg3: '#E8E6E0', card: '#FFFFFF', cardHover: '#FCFBF9',
    border: 'rgba(120,110,100,0.15)', borderHover: 'rgba(120,110,100,0.28)',
    gold: '#1A1A1A', goldDim: 'rgba(26,26,26,0.45)', goldGlow: 'rgba(0,0,0,0.03)',
    accent: '#C44A20', accentHover: '#D85828',
    ink: '#1A1A1A', ink2: '#2E2E2E', ink3: '#6A6A6A', ink4: '#909090',
    green: '#2A6A4A', red: '#C44A20', blue: '#2A4A7A', plum: '#6A3A6A',
    teal: '#2A7A6A', rose: '#8A3A5A', amber: '#B87A20',
    serif: "'Playfair Display',Georgia,serif",
    body: "'Source Serif 4',Georgia,serif",
    sans: "'DM Sans',system-ui,sans-serif",
  },
};

export const THEME_ORDER = ['twilight', 'parchment', 'stone', 'editorial'];

export const TIERS = [
  { name: 'Fresh Ink', min: 0, color: '#8A8474', bg: 'rgba(138,132,116,0.12)' },
  { name: 'Wet Ink', min: 25, color: '#8BAAB8', bg: 'rgba(139,170,184,0.12)' },
  { name: 'Set Ink', min: 100, color: '#A0C090', bg: 'rgba(160,192,144,0.12)' },
  { name: 'Deep Ink', min: 500, color: '#D4A855', bg: 'rgba(212,168,85,0.12)' },
  { name: 'Indelible', min: 2000, color: '#C47232', bg: 'rgba(196,114,50,0.14)' },
];

export function getTier(ink) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (ink >= TIERS[i].min) return TIERS[i];
  }
  return TIERS[0];
}

export function fmtNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

export const LENSES = {
  analyst: { icon: '🔬', label: 'Analyst', color: '#5B9BD5', desc: 'Structure, craft, architecture' },
  empath: { icon: '💖', label: 'Empath', color: '#D4788C', desc: 'Feeling, resonance, nerve' },
  philosopher: { icon: '💡', label: 'Philosopher', color: '#D4A855', desc: 'Ideas, questions, meaning' },
  storyteller: { icon: '🎭', label: 'Storyteller', color: '#9B7ED4', desc: 'Narrative, scene, voice' },
  explorer: { icon: '🗺️', label: 'Explorer', color: '#5BAD7A', desc: 'Discovery, territory, wonder' },
  alchemist: { icon: '✧', label: 'Alchemist', color: '#C4A06A', desc: 'Synthesis, connection, transformation' },
};

export const POST_TYPES = {
  original: { label: 'Original Work', icon: '✍', color: '#C47232' },
  review: { label: 'Review', icon: '📝', color: '#D4A855' },
  recommendation: { label: 'Recommendation', icon: '📚', color: '#6A9A60' },
  spoiler: { label: 'Spoiler Zone', icon: '🔓', color: '#C45A4A' },
};

export const GENRE_TAGS = {
  fiction: ['Literary Fiction', 'Speculative / Sci-Fi', 'Fantasy', 'Horror', 'Romance', 'Mystery / Thriller', 'Historical', 'Satire', 'Magical Realism', 'Experimental'],
  nonfiction: ['Personal Essay', 'Cultural Criticism', 'Memoir', 'Travel', 'Nature / Place', 'Philosophy', 'Craft / Writing', 'Music / Art', 'Food / Body', 'Political'],
  poetry: ['Free Verse', 'Formal / Structured', 'Prose Poetry', 'Narrative Poetry', 'Experimental'],
};

export const MOOD_TAGS = ['Quiet', 'Visceral', 'Tender', 'Dark', 'Playful', 'Elegiac', 'Urgent', 'Meditative', 'Sharp', 'Lush', 'Sparse', 'Haunting', 'Warm', 'Unsettling', 'Luminous'];
