const STORAGE_KEY = "pulsick-creator-conversations";
const LEGACY_STORAGE_KEY = "berta-creator-conversations";

function readConversations() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    const legacyStored = localStorage.getItem(LEGACY_STORAGE_KEY);
    return legacyStored ? JSON.parse(legacyStored) : {};
  } catch (error) {
    console.error("Unable to read creator conversations.", error);
    return {};
  }
}

function writeConversations(conversations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

export function getConversation(creatorId) {
  return readConversations()[creatorId] || [];
}

export function saveMessage(creatorId, message) {
  const conversations = readConversations();
  conversations[creatorId] = [...(conversations[creatorId] || []), message];
  writeConversations(conversations);
  return conversations[creatorId];
}
