import { BASE_URL, USE_MOCK } from "./config";

const videos = [
  ["1", "AI Video — Creator Economy Film", "ForBiggerBlazes.mp4", 16, 9, "AI Trends", "sparkles", true, "2026-02-03", "a1", "00:42"],
  ["2", "AI Animation — Autonomous Agent Lab", "ForBiggerFun.mp4", 4, 5, "AI Agents", "cpu", false, "2026-02-01", "a2", "01:18"],
  ["3", "Generative Video — AI Film Campaign", "BigBuckBunny.mp4", 4, 5, "Generative Video", "play", false, "2026-01-30", "a3", "02:06"],
  ["4", "AI Prompt Design — Creative Explainer", "ElephantsDream.mp4", 16, 9, "Prompting", "lightbulb", true, "2026-02-02", "a2", "01:42"],
  ["5", "AI Workflow — Automated Product Story", "Sintel.mp4", 4, 5, "Productivity", "workflow", false, "2026-01-31", "a1", "00:58"],
  ["6", "AI Product Design — Multimodal Interface", "ForBiggerEscapes.mp4", 4, 5, "AI Product", "layers", true, "2026-02-01", "a3", "02:14"],
  ["7", "AI Creator Tools — Generative Campaign", "ForBiggerFun.mp4", 4, 5, "Creator Tools", "wand", true, "2026-01-29", "a2", "01:31"],
  ["8", "Open-Source AI — Model Visual Essay", "ForBiggerBlazes.mp4", 16, 9, "Open Source AI", "code", false, "2026-01-28", "a1", "01:09"],
  ["9", "AI Creative Direction — Brand Story", "BigBuckBunny.mp4", 16, 9, "AI Culture", "bot", false, "2026-01-27", "a3", "02:30"],
  ["10", "AI Storyboarding — Neon City Sequence", "ForBiggerBlazes.mp4", 16, 9, "AI Video", "sparkles", true, "2026-01-26", "a1", "01:12"],
  ["11", "AI Motion Design — Organic Forms", "ForBiggerFun.mp4", 4, 5, "AI Animation", "wand", false, "2026-01-25", "a2", "00:46"],
  ["12", "Generative Campaign — Future Transit", "BigBuckBunny.mp4", 16, 9, "Generative Campaigns", "play", true, "2026-01-24", "a3", "01:36"],
  ["13", "AI Design Systems — Spatial UI Kit", "ElephantsDream.mp4", 4, 5, "AI Design", "layers", true, "2026-01-23", "a3", "01:04"],
  ["14", "Open-Source AI — Local Model Study", "Sintel.mp4", 16, 9, "Open Source AI", "code", false, "2026-01-22", "a1", "02:18"],
  ["15", "AI Workflow — Brief to Final Cut", "ForBiggerEscapes.mp4", 4, 5, "Productivity", "workflow", false, "2026-01-21", "a2", "00:52"],
  ["16", "AI Fashion Film — Synthetic Runway", "ForBiggerFun.mp4", 4, 5, "AI Video", "sparkles", true, "2026-02-10", "a1", "01:27"],
  ["17", "Generative Worlds — Desert Signal", "BigBuckBunny.mp4", 16, 9, "Generative Video", "play", false, "2026-02-09", "a3", "02:11"],
  ["18", "AI Character Study — Soft Machines", "Sintel.mp4", 4, 5, "AI Animation", "bot", true, "2026-02-08", "a2", "00:54"],
  ["19", "Prompt-to-Poster — Editorial Systems", "ElephantsDream.mp4", 4, 5, "Prompting", "lightbulb", false, "2026-02-07", "a3", "01:16"],
  ["20", "AI Sound & Motion — Night Drive", "ForBiggerBlazes.mp4", 16, 9, "AI Culture", "wand", true, "2026-02-06", "a1", "01:48"],
  ["21", "Local AI Lab — Tiny Model Experiments", "ForBiggerEscapes.mp4", 16, 9, "Open Source AI", "code", false, "2026-02-05", "a2", "02:24"],
  ["22", "AI Brand System — Modular Launch Kit", "ForBiggerFun.mp4", 4, 5, "AI Design", "layers", true, "2026-02-04", "a3", "01:03"],
  ["23", "Creative Agents — From Brief to Board", "BigBuckBunny.mp4", 16, 9, "AI Agents", "cpu", false, "2026-02-03", "a1", "01:39"],
].map(([id, title, file, width, height, category, categoryIcon, isFeatured, publishedAt, authorId, duration]) => ({
  id,
  title,
  videoUrl: `https://storage.googleapis.com/gtv-videos-bucket/sample/${file}`,
  thumbnailUrl: `https://picsum.photos/seed/ai-marketplace-${id}/${width * 90}/${height * 90}`,
  width,
  height,
  category,
  categoryIcon,
  isFeatured,
  publishedAt,
  authorId,
  duration,
}));

const portfolioDetails = {
  "1": { creatorName: "Maya Rodriguez", specialization: "AI filmmaker", tools: ["Runway", "Midjourney"], workflow: "Storyboard → image generation → edit", format: "16:9 campaign film", verified: true },
  "2": { creatorName: "Noah Williams", specialization: "AI animator", tools: ["ComfyUI", "AnimateDiff"], workflow: "Character pass → motion pass → compositing", format: "4:5 social series", verified: true },
  "3": { creatorName: "Leo Kim", specialization: "Generative video creator", tools: ["Kling", "Topaz"], workflow: "Concept frames → video generation → grade", format: "4:5 campaign cut", verified: true },
  "4": { creatorName: "Ava Patel", specialization: "Prompt designer", tools: ["ChatGPT", "Claude"], workflow: "Research → prompt system → testing", format: "16:9 explainer", verified: true },
  "5": { creatorName: "Maya Rodriguez", specialization: "AI workflow designer", tools: ["n8n", "GPT-4o"], workflow: "Brief → automation → review loop", format: "4:5 product story", verified: false },
  "6": { creatorName: "Juliana Park", specialization: "AI product designer", tools: ["Figma AI", "Runway"], workflow: "Moodboard → prototype → motion study", format: "4:5 product film", verified: true },
  "7": { creatorName: "Noah Williams", specialization: "Generative content creator", tools: ["Adobe Firefly", "Runway"], workflow: "Brief → variations → delivery kit", format: "4:5 creator campaign", verified: true },
  "8": { creatorName: "Leo Kim", specialization: "Open-source AI creator", tools: ["Flux", "ComfyUI"], workflow: "Model setup → LoRA pass → edit", format: "16:9 visual essay", verified: true },
  "9": { creatorName: "Ava Patel", specialization: "AI creative director", tools: ["Sora", "ElevenLabs"], workflow: "Script → generation → sound design", format: "16:9 brand story", verified: false },
  "10": { creatorName: "Maya Rodriguez", specialization: "AI filmmaker", tools: ["Runway", "Kling"], workflow: "Reference frames → motion → final cut", format: "16:9 sequence", verified: true },
  "11": { creatorName: "Noah Williams", specialization: "AI animator", tools: ["AnimateDiff", "ComfyUI"], workflow: "Shape study → motion pass → polish", format: "4:5 motion study", verified: true },
  "12": { creatorName: "Ava Patel", specialization: "Generative campaign director", tools: ["Sora", "Midjourney"], workflow: "Campaign system → variations → delivery", format: "16:9 campaign film", verified: true },
  "13": { creatorName: "Juliana Park", specialization: "AI product designer", tools: ["Figma AI", "Flux"], workflow: "System map → visual language → prototype", format: "4:5 design study", verified: true },
  "14": { creatorName: "Leo Kim", specialization: "Open-source AI creator", tools: ["Flux", "ComfyUI"], workflow: "Local model → LoRA pass → edit", format: "16:9 visual essay", verified: true },
  "15": { creatorName: "Noah Williams", specialization: "AI workflow designer", tools: ["n8n", "GPT-4o"], workflow: "Brief intake → automation → review", format: "4:5 workflow demo", verified: false },
  "16": { creatorName: "Maya Rodriguez", specialization: "AI fashion filmmaker", tools: ["Runway", "Midjourney"], workflow: "Look development → motion → editorial cut", format: "4:5 fashion film", verified: true },
  "17": { creatorName: "Leo Kim", specialization: "Generative video creator", tools: ["Kling", "Topaz"], workflow: "Worldbuilding → generation → grade", format: "16:9 short film", verified: true },
  "18": { creatorName: "Noah Williams", specialization: "AI character animator", tools: ["ComfyUI", "AnimateDiff"], workflow: "Character design → rig pass → motion", format: "4:5 character study", verified: true },
  "19": { creatorName: "Ava Patel", specialization: "Prompt designer", tools: ["ChatGPT", "Flux"], workflow: "Reference set → prompt system → art direction", format: "4:5 poster series", verified: false },
  "20": { creatorName: "Maya Rodriguez", specialization: "AI music video director", tools: ["Sora", "ElevenLabs"], workflow: "Beat map → visual generation → sync", format: "16:9 music film", verified: true },
  "21": { creatorName: "Leo Kim", specialization: "Open-source AI creator", tools: ["Flux", "ComfyUI"], workflow: "Model setup → test grid → visual essay", format: "16:9 lab film", verified: true },
  "22": { creatorName: "Juliana Park", specialization: "AI brand designer", tools: ["Figma AI", "Adobe Firefly"], workflow: "Identity system → variations → launch kit", format: "4:5 design system", verified: true },
  "23": { creatorName: "Ava Patel", specialization: "AI creative director", tools: ["Claude", "Runway"], workflow: "Brief parsing → concept board → handoff", format: "16:9 creative process", verified: false },
};

videos.forEach((video) => Object.assign(video, portfolioDetails[video.id]));

const authors = [
  { id: "a1", name: "Mariana Chen", role: "AI Marketplace Editor", avatarUrl: "https://i.pravatar.cc/100?img=47" },
  { id: "a2", name: "Juliana Park", role: "Generative Media Lead", avatarUrl: "https://i.pravatar.cc/100?img=32" },
  { id: "a3", name: "James Brown", role: "AI Product Journalist", avatarUrl: "https://i.pravatar.cc/100?img=12" },
];

const creators = [
  { id: "creator-maya", name: "Maya Rodriguez", handle: "mayagenerates", specialization: "AI filmmaker", status: "Available for films", avatarUrl: "https://i.pravatar.cc/600?img=47", gradient: "linear-gradient(145deg,#392b5f 0%,#177b9b 100%)" },
  { id: "creator-noah", name: "Noah Williams", handle: "noahmotion", specialization: "AI animator", status: "Open to projects", avatarUrl: "https://i.pravatar.cc/600?img=12", gradient: "linear-gradient(145deg,#263b63 0%,#5b3b73 100%)" },
  { id: "creator-leo", name: "Leo Kim", handle: "leomodels", specialization: "Open-source AI creator", status: "Building in public", avatarUrl: "https://i.pravatar.cc/600?img=11", gradient: "linear-gradient(145deg,#243b31 0%,#2d477c 100%)" },
  { id: "creator-ava", name: "Ava Patel", handle: "avaprompts", specialization: "Prompt designer", status: "Available for briefs", avatarUrl: "https://i.pravatar.cc/600?img=32", gradient: "linear-gradient(145deg,#5a304b 0%,#274f79 100%)" },
  { id: "creator-juliana", name: "Juliana Park", handle: "julianalabs", specialization: "AI product designer", status: "Taking collaborations", avatarUrl: "https://i.pravatar.cc/600?img=44", gradient: "linear-gradient(145deg,#3d3b73 0%,#257d75 100%)" },
  { id: "creator-rina", name: "Rina Okafor", handle: "rinacuts", specialization: "Generative video editor", status: "Available this month", avatarUrl: "https://i.pravatar.cc/600?img=45", gradient: "linear-gradient(145deg,#4d285f 0%,#187d8a 100%)" },
  { id: "creator-ethan", name: "Ethan Brooks", handle: "ethanframes", specialization: "AI storyboard artist", status: "Open to campaigns", avatarUrl: "https://i.pravatar.cc/600?img=13", gradient: "linear-gradient(145deg,#283c68 0%,#7a405d 100%)" },
  { id: "creator-sora", name: "Sora Tanaka", handle: "soraloops", specialization: "AI motion designer", status: "Taking commissions", avatarUrl: "https://i.pravatar.cc/600?img=49", gradient: "linear-gradient(145deg,#194f5c 0%,#66427e 100%)" },
  { id: "creator-marcus", name: "Marcus Reed", handle: "marcusrenders", specialization: "3D generative artist", status: "Available for worlds", avatarUrl: "https://i.pravatar.cc/600?img=68", gradient: "linear-gradient(145deg,#4b3a26 0%,#245b72 100%)" },
  { id: "creator-laila", name: "Laila Hassan", handle: "lailalabs", specialization: "AI art director", status: "Open to partnerships", avatarUrl: "https://i.pravatar.cc/600?img=25", gradient: "linear-gradient(145deg,#61354d 0%,#304f87 100%)" },
  { id: "creator-diego", name: "Diego Alvarez", handle: "diegoprompted", specialization: "Prompt engineer", status: "Available for briefs", avatarUrl: "https://i.pravatar.cc/600?img=52", gradient: "linear-gradient(145deg,#294e40 0%,#513b78 100%)" },
  { id: "creator-priya", name: "Priya Shah", handle: "priyaprototypes", specialization: "AI interaction designer", status: "Taking collaborations", avatarUrl: "https://i.pravatar.cc/600?img=48", gradient: "linear-gradient(145deg,#56325d 0%,#237b72 100%)" },
  { id: "creator-owen", name: "Owen Carter", handle: "owenopenmodels", specialization: "Open-source model artist", status: "Building in public", avatarUrl: "https://i.pravatar.cc/600?img=60", gradient: "linear-gradient(145deg,#273f57 0%,#426b47 100%)" },
  { id: "creator-nia", name: "Nia Williams", handle: "niavisuals", specialization: "AI visual storyteller", status: "Available for films", avatarUrl: "https://i.pravatar.cc/600?img=33", gradient: "linear-gradient(145deg,#662d48 0%,#315b83 100%)" },
  { id: "creator-jonah", name: "Jonah Ellis", handle: "jonahagents", specialization: "Creative agent builder", status: "Open to experiments", avatarUrl: "https://i.pravatar.cc/600?img=14", gradient: "linear-gradient(145deg,#3a476f 0%,#765238 100%)" },
  { id: "creator-mei", name: "Mei Chen", handle: "meigenerates", specialization: "AI fashion creator", status: "Available for launches", avatarUrl: "https://i.pravatar.cc/600?img=20", gradient: "linear-gradient(145deg,#6b3455 0%,#306e80 100%)" },
  { id: "creator-caleb", name: "Caleb Foster", handle: "calebcomposites", specialization: "AI compositing artist", status: "Taking projects", avatarUrl: "https://i.pravatar.cc/600?img=59", gradient: "linear-gradient(145deg,#354b65 0%,#673c68 100%)" },
  { id: "creator-zuri", name: "Zuri Mensah", handle: "zurimakes", specialization: "Generative campaign creator", status: "Open to campaigns", avatarUrl: "https://i.pravatar.cc/600?img=29", gradient: "linear-gradient(145deg,#5e3a2e 0%,#236d7b 100%)" },
  { id: "creator-felix", name: "Felix Morgan", handle: "felixflowstate", specialization: "AI workflow designer", status: "Available for systems", avatarUrl: "https://i.pravatar.cc/600?img=56", gradient: "linear-gradient(145deg,#304b68 0%,#594070 100%)" },
  { id: "creator-amara", name: "Amara Jones", handle: "amarasynth", specialization: "Synthetic media producer", status: "Taking collaborations", avatarUrl: "https://i.pravatar.cc/600?img=43", gradient: "linear-gradient(145deg,#65374f 0%,#306c71 100%)" },
  { id: "creator-kenji", name: "Kenji Ito", handle: "kenjivisions", specialization: "AI animation director", status: "Open to productions", avatarUrl: "https://i.pravatar.cc/600?img=57", gradient: "linear-gradient(145deg,#2e4d6c 0%,#74405a 100%)" },
  { id: "creator-talia", name: "Talia Green", handle: "taliatools", specialization: "Generative tool educator", status: "Available for workshops", avatarUrl: "https://i.pravatar.cc/600?img=37", gradient: "linear-gradient(145deg,#3b5d4a 0%,#62427a 100%)" },
  { id: "creator-sam", name: "Samir Khan", handle: "samirshader", specialization: "AI 3D worldbuilder", status: "Building new worlds", avatarUrl: "https://i.pravatar.cc/600?img=53", gradient: "linear-gradient(145deg,#4c382c 0%,#315a78 100%)" },
  { id: "creator-elena", name: "Elena Rossi", handle: "elenacreates", specialization: "AI brand filmmaker", status: "Available for pitches", avatarUrl: "https://i.pravatar.cc/600?img=38", gradient: "linear-gradient(145deg,#65344f 0%,#245f7c 100%)" },
  { id: "creator-tyler", name: "Tyler Grant", handle: "tylerlatent", specialization: "Latent space artist", status: "Open to collaborations", avatarUrl: "https://i.pravatar.cc/600?img=61", gradient: "linear-gradient(145deg,#34466c 0%,#60446a 100%)" },
];

export { videos };
export function getCreators() { return creators; }

const topPartners = [
  { id: "p1", name: "Maya Rodriguez", specialty: "AI Brand Films", rating: 5.0, completedProjects: 4, completedAt: "2026-10-09" },
  { id: "p2", name: "Noah Williams", specialty: "Workflow Automation", rating: 4.9, completedProjects: 3, completedAt: "2026-10-08" },
  { id: "p3", name: "Ava Patel", specialty: "Generative Product Design", rating: 4.9, completedProjects: 2, completedAt: "2026-10-07" },
  { id: "p4", name: "Leo Kim", specialty: "AI Motion Graphics", rating: 4.8, completedProjects: 3, completedAt: "2026-10-06" },
];

const curatedForYou = [
  { id: "c1", title: "AI Image Generator", description: "Create campaign visuals and concept art", icon: "image" },
  { id: "c2", title: "AI Video Generator", description: "Turn ideas into polished short-form video", icon: "video" },
  { id: "c3", title: "AI Copy Generator", description: "Write briefs, scripts, and launch copy", icon: "text" },
  { id: "c4", title: "AI Workflow Builder", description: "Automate repetitive creative tasks", icon: "bot" },
];

const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 500));
const request = async (path, options) => {
  const response = await fetch(`${BASE_URL}${path}`, options);
  if (!response.ok) throw new Error("The Pulsick service could not complete that request.");
  return response.json();
};

export async function getVideos({ page = 1, limit = 9, category = "", search = "" } = {}) {
  if (!USE_MOCK) {
    return request(`/videos?page=${page}&limit=${limit}&category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`);
  }
  const filtered = videos.filter((video) => {
    const matchesCategory = !category || (category === "Featured" ? video.isFeatured : video.category === category);
    const matchesSearch = !search || video.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((left, right) => new Date(right.publishedAt) - new Date(left.publishedAt));
  const enriched = filtered.map((video) => ({ ...video, ...(portfolioDetails[video.id] || {}) }));
  return delay({ videos: enriched.slice((page - 1) * limit, page * limit), hasMore: page * limit < enriched.length });
}

export async function getTopPartners() {
  return USE_MOCK ? delay(topPartners) : request("/partners/top?period=7d&sort=rating");
}

export async function getCuratedForYou({ userId } = {}) {
  if (!USE_MOCK) {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
    return request(`/recommendations/curated${query}`);
  }
  return delay(curatedForYou);
}

export async function getAuthors() {
  return USE_MOCK ? delay(authors) : request("/authors");
}

export async function subscribeNewsletter(email) {
  if (!USE_MOCK) return request("/newsletter/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
  if (!email.includes("@")) throw new Error("Please enter a valid email address.");
  return delay({ success: true });
}

export function getMockAuthor(id) {
  return authors.find((author) => author.id === id) || authors[0];
}
