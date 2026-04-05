import { writable, derived } from "svelte/store";
import { WEAPONS, type WeaponDef } from "../data/weapons";

export const selectedWeapon = writable<WeaponDef>(WEAPONS[0]);
export const selectedJob = writable<string>("");

/** 選択武器が変わったらジョブをリセット */
selectedWeapon.subscribe((weapon) => {
  selectedJob.set(weapon.jobs[0] ?? "");
});
