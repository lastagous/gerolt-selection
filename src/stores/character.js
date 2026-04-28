import { writable, get } from "svelte/store";

const NODESTONE_URL = import.meta.env.PUBLIC_PROXY_URL ?? "https://gerolt-proxy.lastagous.workers.dev";

function loadFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("gs_characters");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function loadSelectedFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("gs_selectedCharacter");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveToStorage(chars) {
  if (typeof window === "undefined") return;
  localStorage.setItem("gs_characters", JSON.stringify(chars));
}

function saveSelectedToStorage(char) {
  if (typeof window === "undefined") return;
  localStorage.setItem("gs_selectedCharacter", JSON.stringify(char));
}

export const characters        = writable([]);
export const selectedCharacter = writable(null);
export const isFetching        = writable(false);
export const fetchError        = writable(null);

export function initCharacterStore() {
  characters.set(loadFromStorage());
  selectedCharacter.set(loadSelectedFromStorage());
}

export function upsertCharacter(char) {
  const list = [char];
  characters.set(list);
  saveToStorage(list);
  selectedCharacter.set(char);
  saveSelectedToStorage(char);
}

export function removeCharacter(id) {
  characters.update((list) => {
    const updated = list.filter((c) => c.collect.character.id !== id);
    saveToStorage(updated);
    return updated;
  });
  if (get(selectedCharacter)?.collect.character.id === id) {
    selectedCharacter.set(null);
    saveSelectedToStorage(null);
  }
}

export async function fetchCharacter(lodestoneId) {
  isFetching.set(true);
  fetchError.set(null);
  try {
    const res = await fetch(`${NODESTONE_URL}/character/${lodestoneId}`);
    if (res.status === 404) throw new Error("キャラクターが見つかりません (Lodestone ID を確認してください)");
    if (!res.ok) throw new Error(`キャラクター取得失敗 (${res.status})`);
    const json = await res.json();
    upsertCharacter({
      collect: {
        character: {
          id:           json.id,
          name:         json.name,
          avatar:       json.avatar,
          achievements: { public: json.achievements?.public ?? false },
        },
        achievements: (json.achievements?.ids ?? []).map((id) => ({ id })),
      },
      updateTimestamp: Math.floor(Date.now() / 1000),
    });
  } catch (e) {
    fetchError.set(e?.message ?? "不明なエラーが発生しました");
  } finally {
    isFetching.set(false);
  }
}
