export const USERS = [
  { id:"u1", name:"Ingrid Solberg",  handle:"@ingridreads",  initials:"IS", ink:3420,  lens:"analyst" },
  { id:"u2", name:"Kofi Asante",     handle:"@kofi_writes",  initials:"KA", ink:8750,  lens:"storyteller" },
  { id:"u3", name:"Yuki Tanaka",     handle:"@yukiwrites",   initials:"YT", ink:1240,  lens:"empath" },
  { id:"u4", name:"James Harlow",    handle:"@jharlow",      initials:"JH", ink:540,   lens:"explorer" },
  { id:"u5", name:"Priya Anand",     handle:"@priyareads",   initials:"PA", ink:12300, lens:"empath" },
  { id:"u6", name:"Tomás Reyes",     handle:"@tomasreyes",   initials:"TR", ink:280,   lens:"philosopher" },
  { id:"u7", name:"Aisha Keita",     handle:"@aishak",       initials:"AK", ink:4100,  lens:"storyteller" },
  { id:"u8", name:"Amira Khoury",    handle:"@amirakhoury",  initials:"AM", ink:8400,  lens:"alchemist" },
];

export const ME = { id:"me", name:"Sean", handle:"@sean", initials:"SP", ink:1240, lens:"analyst" };

export const CURRENTLY_READING = [
  { user: USERS[0], book:"Intermezzo",      author:"Sally Rooney",      progress:72 },
  { user: USERS[1], book:"James",           author:"Percival Everett",  progress:45 },
  { user: USERS[4], book:"Orbital",         author:"Samantha Harvey",   progress:88 },
  { user: USERS[2], book:"The Vegetarian",  author:"Han Kang",          progress:31 },
  { user: USERS[6], book:"Creation Lake",   author:"Rachel Kushner",    progress:56 },
];

export const FEED_ITEMS = [
  {
    id:"p1", type:"review", user:USERS[0], time:"2h",
    bookRef:{ title:"Intermezzo", author:"Sally Rooney", coverColor:"#3A5A4A" },
    title:"The architecture of longing",
    text:"Rooney builds Intermezzo like a fugue — two brothers, two registers, two ways of failing at intimacy. The formal innovation isn't the dual POV; it's how the prose style itself shifts between them. Peter gets the modernist stream. Ivan gets the plain speech. The gap between those registers IS the novel.",
    rating:4, likes:47, comments:12, shelved:23, reposts:8,
    isLiked:false, isShelved:false, isReposted:false,
    tags:["literary-fiction","structure"], following:true, lensMatch:true,
  },
  {
    id:"p2", type:"original", user:USERS[1], time:"4h",
    title:"Sixteen Funerals",
    text:"My grandmother attended sixteen funerals in the year she turned eighty. She told me once that grief has a sound — not the crying, not the hymns — but the moment after the last car leaves and the house goes quiet. That hum, she said. That's what the dead leave behind.\n\nI didn't understand until I heard it myself.",
    likes:89, comments:34, shelved:56, reposts:18,
    isLiked:true, isShelved:false, isReposted:false,
    tags:["flash-prose","grief"], following:true, isFirst:true, attestation:true,
  },
  {
    id:"p3", type:"recommendation", user:USERS[4], time:"6h",
    bookRef:{ title:"Orbital", author:"Samantha Harvey", coverColor:"#2A3A6A" },
    text:"If you've ever stared out a plane window and felt the weight of everyone below you living their entire lives — read this. Harvey writes about astronauts the way mystics write about silence. It's 250 pages. It contains the universe.",
    likes:112, comments:28, shelved:89, reposts:32,
    isLiked:false, isShelved:true, isReposted:false,
    tags:["literary-fiction","contemplative"], following:true, lensMatch:true,
  },
  {
    id:"p4", type:"spoiler", user:USERS[3], time:"8h",
    bookRef:{ title:"James", author:"Percival Everett", coverColor:"#5A3A2A" },
    title:"The river scene rewrites everything",
    text:"When Jim's internal monologue drops the dialect for the first time — the real voice emerging — I physically set the book down. Everett spent 200 pages building the mask so that the reveal doesn't just surprise you; it indicts you for needing the mask in the first place.",
    spoilerPage:"p. 212", likes:34, comments:19, shelved:8, reposts:3,
    isLiked:false, isShelved:false, isReposted:false,
    tags:["historical-fiction","voice"], lensMatch:true,
  },
  {
    id:"p5", type:"original", user:USERS[7], time:"12h",
    title:"The Cartographer's Confession",
    text:"I have drawn borders where none exist. I have named rivers after men who never saw them. And in my seventy-third year, I understand that every map I made was a letter to someone I couldn't reach — a way of saying: here is where I am. Here is the distance between us.\n\nMeasure it. Then forgive me for making it seem smaller than it was.",
    likes:203, comments:67, shelved:124, reposts:45,
    isLiked:false, isShelved:false, isReposted:false,
    tags:["poetry","place"], attestation:true,
    inspiredBy:{ title:"Flights", author:"Olga Tokarczuk" },
  },
  {
    id:"p6", type:"review", user:USERS[2], time:"1d",
    bookRef:{ title:"The Vegetarian", author:"Han Kang", coverColor:"#4A6A3A" },
    title:"Hunger as refusal",
    text:"Kang understands that the most terrifying act of autonomy isn't violence — it's silence. Yeong-hye's vegetarianism isn't a diet; it's a withdrawal from every contract society ever imposed on her body.",
    rating:5, likes:78, comments:31, shelved:45, reposts:14,
    isLiked:false, isShelved:false, isReposted:false,
    tags:["international","autonomy"], following:true,
  },
];

export const TRENDING = [
  { title:"Intermezzo",   author:"Sally Rooney",      readers:412, heat:"+34%", color:"#3A5A4A" },
  { title:"James",        author:"Percival Everett",  readers:387, heat:"+28%", color:"#5A3A2A" },
  { title:"Orbital",      author:"Samantha Harvey",   readers:298, heat:"+22%", color:"#2A3A6A" },
  { title:"Beloved",      author:"Toni Morrison",     readers:342, heat:"+15%", color:"#6A2A3A" },
];

export const WRITING_PROMPTS = [
  "Write about an object you inherited that carries more weight than it should.",
  "The last lie your character told before everything changed.",
  "A letter never sent, found decades later in a book.",
  "Two strangers in a waiting room share the same recurring dream.",
];

export const NOTIFICATIONS = [
  { id:"n1", type:"like",    actor:{ name:"Kofi Asante",   initials:"KA", ink:8750 }, postTitle:"Sixteen Funerals",       timeAgo:"2m",  read:false },
  { id:"n2", type:"comment", actor:{ name:"Priya Anand",   initials:"PA", ink:12300}, postTitle:"Sixteen Funerals",       preview:"That line about the hum — I felt it.",   timeAgo:"14m", read:false },
  { id:"n3", type:"shelf",   actor:{ name:"Yuki Tanaka",   initials:"YT", ink:1240 }, postTitle:"Sixteen Funerals", shelfName:"Writing That Stays",  timeAgo:"1h",  read:false },
  { id:"n4", type:"follow",  actor:{ name:"Aisha Keita",   initials:"AK", ink:4100 }, timeAgo:"3h",  read:true },
  { id:"n5", type:"ink",  amount:120, reason:"Your post earned community engagement", timeAgo:"3h", read:true },
  { id:"n6", type:"repost",  actor:{ name:"Amira Khoury",  initials:"AM", ink:8400 }, postTitle:"Sixteen Funerals",       timeAgo:"6h",  read:true },
];

export const CONVERSATIONS = [
  {
    id:"c1", unread:2,
    with:{ name:"Kofi Asante", handle:"@kofi_writes", initials:"KA", ink:8750, online:true },
    lastMessage:{ text:"That ending though — did you expect it?", timeAgo:"5m", mine:false },
    messages:[
      { id:"m1", mine:false, text:"Just finished The God of Small Things. You were right.", timeAgo:"1h" },
      { id:"m2", mine:true,  text:"I told you! The language alone is worth it.", timeAgo:"58m" },
      { id:"m3", mine:false, text:"The way she writes caste — it's architectural.", timeAgo:"45m" },
      { id:"m4", mine:true,  text:"Roy is building the prison of the novel around you before you realize you're inside it.", timeAgo:"40m" },
      { id:"m5", mine:false, text:"That ending though — did you expect it?", timeAgo:"5m" },
    ],
  },
  {
    id:"c2", unread:0,
    with:{ name:"Priya Anand", handle:"@priyareads", initials:"PA", ink:12300, online:false },
    lastMessage:{ text:"Reading your piece changed how I think about translation.", timeAgo:"2h", mine:false },
    messages:[
      { id:"m6", mine:false, text:"Reading your piece changed how I think about translation.", timeAgo:"2h" },
      { id:"m7", mine:true,  text:"That means a lot — I wasn't sure it landed.", timeAgo:"1h" },
    ],
  },
];

export const SHELVES = [
  { id:"s1", name:"Stories That Wrecked Me", desc:"Fiction that left a mark I couldn't wash off.", count:7, followers:234, books:["Sixteen Funerals","The Cartographer's Confession","Grief Manual","Beloved","The God of Small Things"] },
  { id:"s2", name:"The Grief Library",       desc:"Everything I've read about loss, and what stayed.", count:5, followers:178, books:["Beloved","Year of Magical Thinking","Blue Nights","Ocean at End of Lane"] },
  { id:"s3", name:"Writers to Watch",        desc:"Debut voices on Précis worth following.", count:4, followers:312, books:["Nneka's Debut","Tomás Rivera Collection","Lila Okonkwo"] },
];

export const BOOKS = [
  { id:"bk1", title:"Beloved",            author:"Toni Morrison",     year:1987, pages:324, coverColor:"#8B4513", genre:"Literary Fiction", rating:4.8, reviews:47, trending:true },
  { id:"bk2", title:"Intermezzo",         author:"Sally Rooney",      year:2024, pages:448, coverColor:"#3A5A4A", genre:"Contemporary",     rating:4.2, reviews:89, trending:true },
  { id:"bk3", title:"James",              author:"Percival Everett",  year:2024, pages:303, coverColor:"#5A3A2A", genre:"Literary Fiction", rating:4.6, reviews:71, trending:true },
  { id:"bk4", title:"Orbital",            author:"Samantha Harvey",   year:2023, pages:250, coverColor:"#2A3A6A", genre:"Literary Fiction", rating:4.7, reviews:58, trending:true },
  { id:"bk5", title:"The Vegetarian",     author:"Han Kang",          year:2007, pages:188, coverColor:"#4A6A3A", genre:"Literary Fiction", rating:4.5, reviews:61, trending:false },
  { id:"bk6", title:"Creation Lake",      author:"Rachel Kushner",    year:2024, pages:384, coverColor:"#6A4A2A", genre:"Literary Fiction", rating:4.1, reviews:34, trending:false },
  { id:"bk7", title:"The God of Small Things", author:"Arundhati Roy", year:1997, pages:340, coverColor:"#2A7C7C", genre:"Literary Fiction", rating:4.7, reviews:52, trending:false },
  { id:"bk8", title:"Flights",            author:"Olga Tokarczuk",    year:2007, pages:404, coverColor:"#5A5A8A", genre:"Literary Fiction", rating:4.3, reviews:43, trending:false },
];

// Compatibility aliases
export const POSTS = FEED_ITEMS;
export const CURRENT_USER = ME;
export const EXPLORE_READERS = USERS.map(u => ({ ...u, following: u.ink > 1000, followers: Math.floor(u.ink * 0.8), posts: Math.floor(u.ink / 10) }));
export const PRESS_POSTS = FEED_ITEMS.map((p, i) => ({
  ...p, featured: i === 0, editorPick: i < 2,
  timeAgo: p.time, author: p.user,
}));

export const CHALLENGES = [
  { id:"ch1", title:"The Memory Shelf", desc:"Write a piece about an object from your childhood that holds a story you've never told.", entries:142, daysLeft:5, prize:"Deep Ink", tag:"flash-prose", featured:true },
  { id:"ch2", title:"First & Last Lines", desc:"Begin and end your piece with lines from a public domain text. The space between is yours.", entries:89, daysLeft:12, prize:"Set Ink", tag:"constraint", featured:false },
  { id:"ch3", title:"The Unreliable Room", desc:"Write a scene set in a single room where the narrator cannot be trusted about what they see.", entries:67, daysLeft:8, prize:"Set Ink", tag:"fiction", featured:false },
  { id:"ch4", title:"Translation Loss", desc:"Write about something that cannot be translated — a feeling, a moment, a word in another tongue.", entries:204, daysLeft:3, prize:"Indelible", tag:"essay", featured:false },
];

export const CLUBS = [
  { id:"cl1", name:"Grief & Literature Circle", desc:"Reading works that hold grief without resolving it.", members:34, books:12, active:true, joined:true },
  { id:"cl2", name:"Structures & Form", desc:"Writers obsessed with how form makes meaning.", members:21, books:8, active:true, joined:false },
  { id:"cl3", name:"The Short Form", desc:"Flash fiction, prose poems, and the art of brevity.", members:56, books:15, active:false, joined:true },
  { id:"cl4", name:"Decolonizing the Canon", desc:"Reading outside the Western literary tradition.", members:88, books:20, active:true, joined:false },
];
