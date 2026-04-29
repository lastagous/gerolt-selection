import { writable, get } from "svelte/store";

export const WEAPONS = [
  { key: "ZW", name: "Zodiac Weapon",      level: 50,  patch: "2.0 - 2.51",
    stepPatches: ["2.0","2.0","2.2","2.28","2.28","2.38","2.45","2.51"],
    jobs: ["PLD","WAR","WHM","SCH","MNK","DRG","NIN","BRD","BLM","SMN"] },
  { key: "AW", name: "Anima Weapon",       level: 60,  patch: "3.15 - 3.55",
    stepPatches: ["3.15","3.2","3.3","3.3","3.3","3.45","3.5","3.55"],
    jobs: ["PLD","WAR","DRK","WHM","SCH","AST","MNK","DRG","NIN","BRD","MCH","BLM","SMN"] },
  { key: "EW", name: "Eureka Weapon",      level: 70,  patch: "4.25 - 4.55",
    stepPatches: ["4.25","4.25","4.25","4.25","4.36","4.36","4.36","4.45","4.45","4.45","4.55","4.55","4.55","4.55","4.55"],
    jobs: ["PLD","WAR","DRK","WHM","SCH","AST","MNK","DRG","NIN","SAM","BRD","MCH","BLM","SMN","RDM"] },
  { key: "RW", name: "Resistance Weapon",  level: 80,  patch: "5.25 - 5.55",
    stepPatches: ["5.25","5.25","5.25","5.35","5.45","5.55"],
    jobs: ["PLD","WAR","DRK","GNB","WHM","SCH","AST","MNK","DRG","NIN","SAM","BRD","MCH","DNC","BLM","SMN","RDM"] },
  { key: "MW", name: "Manderville Weapon", level: 90,  patch: "6.25 - 6.55",
    stepPatches: ["6.25","6.35","6.45","6.55"],
    jobs: ["PLD","WAR","DRK","GNB","WHM","SCH","AST","SGE","MNK","DRG","NIN","SAM","RPR","BRD","MCH","DNC","BLM","SMN","RDM"] },
  { key: "PW", name: "Phantom Weapon",     level: 100, patch: "7.25 - 7.41",
    stepPatches: ["7.25","7.31","7.41"],
    jobs: ["PLD","WAR","DRK","GNB","WHM","SCH","AST","SGE","MNK","DRG","NIN","SAM","RPR","VPR","BRD","MCH","DNC","BLM","SMN","RDM","PCT"] },
];

export const selectedWeapon = writable(WEAPONS[0]);
export const selectedJob    = writable("");

selectedWeapon.subscribe((weapon) => {
  const current = get(selectedJob);
  if (!weapon.jobs.includes(current)) {
    selectedJob.set(weapon.jobs[0] ?? "");
  }
});
