export interface WeaponDef {
  key: string;
  name: string;
  level: number;
  jobs: string[];
}

export const WEAPONS: WeaponDef[] = [
  {
    key: "ZW",
    name: "Zodiac Weapon",
    level: 50,
    jobs: ["PLD", "WAR", "WHM", "SCH", "MNK", "DRG", "NIN", "BRD", "BLM", "SMN"],
  },
  {
    key: "AW",
    name: "Anima Weapon",
    level: 60,
    jobs: ["PLD", "WAR", "DRK", "WHM", "SCH", "AST", "MNK", "DRG", "NIN", "BRD", "MCH", "BLM", "SMN"],
  },
  {
    key: "EW",
    name: "Eureka Weapon",
    level: 70,
    jobs: ["PLD", "WAR", "DRK", "WHM", "SCH", "AST", "MNK", "DRG", "NIN", "SAM", "BRD", "MCH", "BLM", "SMN", "RDM"],
  },
  {
    key: "RW",
    name: "Resistance Weapon",
    level: 80,
    jobs: ["PLD", "WAR", "DRK", "GNB", "WHM", "SCH", "AST", "MNK", "DRG", "NIN", "SAM", "BRD", "MCH", "DNC", "BLM", "SMN", "RDM"],
  },
  {
    key: "MW",
    name: "Manderville Weapon",
    level: 90,
    jobs: ["PLD", "WAR", "DRK", "GNB", "WHM", "SCH", "AST", "SGE", "MNK", "DRG", "NIN", "SAM", "RPR", "BRD", "MCH", "DNC", "BLM", "SMN", "RDM"],
  },
];

export function getWeaponByKey(key: string): WeaponDef | undefined {
  return WEAPONS.find((w) => w.key === key);
}
