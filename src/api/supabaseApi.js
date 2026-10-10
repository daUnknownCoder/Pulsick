import { supabase, supabaseConfigured } from "../../utils/supabase";

export const isSupabaseReady = () => supabaseConfigured && Boolean(supabase);

export async function signIn(email, password) {
  if (!supabase) throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (data.user) {
    try { await upsertProfile(data.user); } catch (profileError) { console.warn("Unable to update profile.", profileError); }
  }
  return data;
}

export async function signUp(email, password, displayName, role = "user") {
  if (!supabase) throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.");
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName, role } } });
  if (error) throw error;
  // When email confirmation is on, Supabase returns a user without a session.
  // The database trigger in supabase/schema.sql creates that user's profile safely.
  if (data.user && data.session) {
    try { await upsertProfile(data.user, displayName, role); } catch (profileError) { console.warn("Unable to update profile.", profileError); }
  }
  return data;
}

export async function signOut() {
  if (supabase) {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}

export async function getCurrentSession() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function subscribeToAuth(callback) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

export async function signInWithGoogle() {
  if (!supabase) throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.");
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/profile` } });
  if (error) throw error;
  return data;
}

export async function upsertProfile(user, displayName = "", role = "") {
  if (!supabase || !user) return null;
  const { data, error } = await supabase.from("profiles").upsert({
    id: user.id,
    display_name: displayName || user.user_metadata?.display_name || user.email?.split("@")[0] || "Pulsick member",
    email: user.email || "",
    role: role || user.user_metadata?.role || "user",
    updated_at: new Date().toISOString(),
  }).select().single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, updates) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase.from("profiles").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", userId).select().single();
  if (error) throw error;
  return data;
}

export async function getProfile(userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPersistentConversation(creatorId, userId) {
  if (!supabase || !userId) return [];
  const { data, error } = await supabase.from("messages").select("*").eq("creator_id", String(creatorId)).eq("user_id", userId).order("created_at");
  if (error) throw error;
  return (data || []).map((message) => ({ ...message, createdAt: message.created_at, sender: message.sender }));
}

export async function sendPersistentMessage(creatorId, userId, message) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase.from("messages").insert({
    creator_id: String(creatorId),
    user_id: userId,
    sender: message.sender,
    text: message.text || "",
    image: message.image || "",
    image_name: message.imageName || "",
  }).select().single();
  if (error) throw error;
  return { ...data, createdAt: data.created_at };
}

export function subscribeToMessages(creatorId, userId, onMessage) {
  if (!supabase || !userId) return () => {};
  const channel = supabase.channel(`messages:${userId}:${creatorId}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `creator_id=eq.${String(creatorId)}` }, (payload) => {
      if (payload.new.user_id === userId) onMessage({ ...payload.new, createdAt: payload.new.created_at });
    })
    .subscribe();
  return () => { supabase.removeChannel(channel); };
}

export async function getCreatorDirectory() {
  if (!supabase) return [];
  const { data, error } = await supabase.from("creators").select("*").order("name");
  if (error) throw error;
  return (data || []).map((creator) => ({
    ...creator,
    avatarUrl: creator.avatar_url,
  }));
}

export async function getCreator(creatorId) {
  if (!supabase || !creatorId) return null;
  const { data, error } = await supabase.from("creators").select("*").eq("id", creatorId).maybeSingle();
  if (error) throw error;
  return data ? { ...data, avatarUrl: data.avatar_url } : null;
}
