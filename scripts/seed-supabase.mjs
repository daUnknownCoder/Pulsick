import { createClient } from "@supabase/supabase-js";
import { getCreators } from "../src/api/videosApi.js";

const url = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const password = process.env.SUPABASE_DEMO_PASSWORD || "PulsickDemo!2026";
if (!url || !serviceRoleKey) throw new Error("Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.");

const supabase = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
const { data: userData, error: usersError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (usersError) throw usersError;
const usersByEmail = new Map(userData.users.map((user) => [user.email, user]));
const creators = getCreators();

for (const creator of creators) {
  const email = `${creator.id.replace("creator-", "")}@demo.pulsick.test`;
  let user = usersByEmail.get(email);
  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { display_name: creator.name, role: "creator" } });
    if (error) throw error;
    user = data.user;
  }
  const { error: profileError } = await supabase.from("profiles").upsert({ id: user.id, display_name: creator.name, email, role: "creator", avatar_url: creator.avatarUrl, bio: `${creator.specialization} in the Pulsick creator network.`, location: "Mumbai, India" });
  if (profileError) throw profileError;
  const { error: creatorError } = await supabase.from("creators").upsert({ id: creator.id, name: creator.name, handle: creator.handle, specialization: creator.specialization, status: creator.status, avatar_url: creator.avatarUrl, gradient: creator.gradient, profile_id: user.id });
  if (creatorError) throw creatorError;
  console.log(`Seeded ${creator.name} — ${email}`);
}
console.log(`Seeded ${creators.length} linked creator accounts. Demo password: ${password}`);
