import { writable } from "svelte/store";
import { WEAPONS } from "./selection.js";

const _cache   = new Map();
const _loading = new Map();

export const weaponMetas = writable({});

export async function loadWeaponMeta(key) {
  if (typeof window === "undefined") return;
  if (_cache.has(key)) return _cache.get(key);
  if (_loading.has(key)) return _loading.get(key);
  const p = fetch(`/data/${key.toLowerCase()}/meta.json`)
    .then(r => r.json())
    .then(data => {
      _cache.set(key, data);
      weaponMetas.update(m => ({ ...m, [key]: data }));
      _loading.delete(key);
      return data;
    });
  _loading.set(key, p);
  return p;
}

export async function loadAllWeaponMetas() {
  return Promise.all(WEAPONS.map(w => loadWeaponMeta(w.key)));
}

export function getSteps(meta, job) {
  return meta?.[job] ?? [];
}

export function getJobRate(meta, job, character) {
  if (!character || !meta) return 0;
  const steps = meta[job] ?? [];
  const ids = steps.flatMap(s => s.achievements.map(a => a.id));
  if (ids.length === 0) return 0;
  return character.collect.achievements.filter(a => ids.includes(a.id)).length / ids.length;
}

export function getWeaponRate(meta, weapon, character) {
  if (!character || !meta || weapon.jobs.length === 0) return 0;
  const total = weapon.jobs.reduce((sum, job) => sum + getJobRate(meta, job, character), 0);
  return total / weapon.jobs.length;
}

export function getShareText(metas, character) {
  const name = character.collect.character.name;
  let text = "";
  let totalRate = 0;
  const blocks = 8;
  WEAPONS.forEach((weapon) => {
    const rate = metas[weapon.key] ? getWeaponRate(metas[weapon.key], weapon, character) : 0;
    totalRate += rate;
    const filled = Math.floor(rate * blocks);
    text += `${weapon.name} [${"■".repeat(filled)}${"・".repeat(blocks - filled)}] ${Math.floor(rate * 100)}%\n`;
  });
  const overallPct = Math.floor((totalRate * 100) / WEAPONS.length);
  return `${name} の武器生成の達成度 ${overallPct}%\n\n${text}`;
}
