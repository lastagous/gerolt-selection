import { writable, get } from "svelte/store";

// ---- 型定義 ----
export interface FFxivCollectCharacter {
  id: number;
  name: string;
  server: string;
  data_center: string;
  portrait: string;
  avatar: string;
  last_parsed: string;
  achievements: { public: boolean };
}

export interface FFxivCollectAchievement {
  id: number;
}

export interface StoredCharacter {
  collect: {
    character: FFxivCollectCharacter;
    achievements: FFxivCollectAchievement[];
  };
  updateTimestamp: number;
}

// ---- localStorage ヘルパー ----
function loadFromStorage(): StoredCharacter[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("gs_characters");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadSelectedFromStorage(): StoredCharacter | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("gs_selectedCharacter");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToStorage(chars: StoredCharacter[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("gs_characters", JSON.stringify(chars));
}

function saveSelectedToStorage(char: StoredCharacter | null): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("gs_selectedCharacter", JSON.stringify(char));
}

// ---- ストア定義 ----
export const characters = writable<StoredCharacter[]>([]);
export const selectedCharacter = writable<StoredCharacter | null>(null);
export const isFetching = writable(false);
export const fetchError = writable<string | null>(null);

/** ブラウザ初期化時に localStorage から復元 */
export function initCharacterStore(): void {
  characters.set(loadFromStorage());
  selectedCharacter.set(loadSelectedFromStorage());
}

/** キャラクターを upsert して選択状態にする */
export function upsertCharacter(char: StoredCharacter): void {
  const id = char.collect.character.id;
  characters.update((list) => {
    const filtered = list.filter((c) => c.collect.character.id !== id);
    const updated = [char, ...filtered];
    saveToStorage(updated);
    return updated;
  });
  selectedCharacter.set(char);
  saveSelectedToStorage(char);
}

/** キャラクターを削除 */
export function removeCharacter(id: number): void {
  characters.update((list) => {
    const updated = list.filter((c) => c.collect.character.id !== id);
    saveToStorage(updated);
    return updated;
  });
  const sel = get(selectedCharacter);
  if (sel?.collect.character.id === id) {
    selectedCharacter.set(null);
    saveSelectedToStorage(null);
  }
}

/** FFXIV Collect API からキャラクター情報を取得 */
export async function fetchCharacter(lodestoneId: string): Promise<void> {
  isFetching.set(true);
  fetchError.set(null);
  try {
    const [charRes, achRes] = await Promise.all([
      fetch(`https://ffxivcollect.com/api/characters/${lodestoneId}`),
      fetch(`https://ffxivcollect.com/api/characters/${lodestoneId}/achievements/owned`),
    ]);
    if (!charRes.ok) throw new Error(`キャラクター取得失敗 (${charRes.status})`);
    if (!achRes.ok) throw new Error(`実績取得失敗 (${achRes.status})`);

    const character: FFxivCollectCharacter = await charRes.json();
    const achievements: FFxivCollectAchievement[] = await achRes.json();

    upsertCharacter({
      collect: { character, achievements },
      updateTimestamp: Math.floor(Date.now() / 1000),
    });
  } catch (e: any) {
    fetchError.set(e?.message ?? "不明なエラーが発生しました");
  } finally {
    isFetching.set(false);
  }
}
