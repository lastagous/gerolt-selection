import { writable, get } from "svelte/store";
import type { WeaponDef } from "../data/weapons";
import { WEAPONS } from "../data/weapons";
import type { StoredCharacter } from "./character";

export interface Relation {
  classJobCategory: { Name: string; Name_ja: string };
  achievements: Array<{ achievement: { id: number; name?: string } }>;
  items: Array<{ LevelEquip: number; LevelItem: number; Name_ja?: string }>;
  quests: Array<{
    quest: { id: number; name: string; location?: string; usedItems?: number[] };
    partials?: any[];
  }>;
}

// relations.json をランタイムで fetch（バンドルサイズ対策）
export const relations = writable<Relation[]>([]);
export const relationsLoaded = writable(false);

export async function loadRelations(): Promise<void> {
  if (get(relationsLoaded)) return;
  const res = await fetch("/data/relations.json");
  const data: Relation[] = await res.json();
  relations.set(data);
  relationsLoaded.set(true);
}

export function getAchievementIds(
  rels: Relation[],
  weapon: WeaponDef,
  job: string
): number[] {
  return rels
    .filter(
      (r) =>
        r.classJobCategory.Name === job &&
        r.items[0]?.LevelEquip === weapon.level
    )
    .flatMap((r) => r.achievements.map((a) => a.achievement.id));
}

export function getJobRate(
  rels: Relation[],
  weapon: WeaponDef,
  job: string,
  character: StoredCharacter | null
): number {
  if (!character) return 0;
  const ids = getAchievementIds(rels, weapon, job);
  if (ids.length === 0) return 0;
  const owned = character.collect.achievements.filter((a) => ids.includes(a.id));
  return owned.length / ids.length;
}

export function getWeaponRate(
  rels: Relation[],
  weapon: WeaponDef,
  character: StoredCharacter | null
): number {
  if (!character || weapon.jobs.length === 0) return 0;
  const total = weapon.jobs.reduce(
    (sum, job) => sum + getJobRate(rels, weapon, job, character),
    0
  );
  return total / weapon.jobs.length;
}

export function getShareText(
  rels: Relation[],
  character: StoredCharacter
): string {
  const name = character.collect.character.name;
  let text = "";
  let totalRate = 0;
  const blocks = 8;
  WEAPONS.forEach((weapon) => {
    const rate = getWeaponRate(rels, weapon, character);
    totalRate += rate;
    const filled = Math.floor(rate * blocks);
    text += `${weapon.name} [${"■".repeat(filled)}${"・".repeat(blocks - filled)}] ${Math.floor(rate * 100)}%\n`;
  });
  const overallPct = Math.floor((totalRate * 100) / WEAPONS.length);
  return `${name} の武器生成の達成度 ${overallPct}%\n\n${text}`;
}

export function getSteps(
  rels: Relation[],
  weapon: WeaponDef,
  job: string
): Relation[] {
  return rels
    .filter(
      (r) =>
        r.classJobCategory.Name === job &&
        r.items[0]?.LevelEquip === weapon.level &&
        r.items[0]?.LevelItem >= 60
    )
    .sort((a, b) => (a.items[0].LevelItem >= b.items[0].LevelItem ? 1 : -1));
}
