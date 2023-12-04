export interface SummaryAchievement {
  i: number; // id
  n: string; // name
  c: number; // icon
  t: number; // category
  b: string; // descriptio
}

export interface Achievement {
  achievement: AchievementDetail;
}

export interface AchievementDetail {
  name: string;
  description: string;
  id: number;
  patch: number;
  points: number;
  category: number;
  icon: number;
}

export interface SummaryQuest {
  i: number; // id
  n: string; // name
  g: number; // genre
  l: string; // location
  s: number; // sort
  r: number; // repeatable
  f: number; // unlocksFunction
}

export interface Quest {
  quest: QuestDetail;
  partials: QuestPartial[];
}

export interface QuestDetail {
  name: string;
  location: string;
  id: number;
  patch: number;
  sort: number;
  repeatable: number;
  unlocksFunction: number;
  eventIcon: number;
  issuer: number;
  target: number;
  genre: number;
  usedItems: number[];
  journal: string[];
  objectives: string[];
  dialogue: any[];
  reward: any;
  reqs: any;
}

export interface QuestPartial {
  type: string;
  id: string;
  obj: any;
}

export interface Item {
  ClassJobCategory: ClassJobCategory;
  Description_ja: string;
  EquipSlotCategory: EquipSlotCategory;
  ID: number;
  Icon: string; // /i/034000/034693.png
  IconID: number;
  LevelEquip: number;
  LevelItem: number;
  Name: string;
  Name_de: string;
  Name_en: string;
  Name_fr: string;
  Name_ja: string;
  Patch: number;
  Url: string; // /Item/21965
  UrlType: string;
}

export interface ClassJobCategory {
  Name: string;
  Name_de: string;
  Name_en: string;
  Name_fr: string;
  Name_ja: string;
}

export interface EquipSlotCategory {
  Body: number;
  Ears: number;
  Feet: number;
  FingerL: number;
  FingerR: number;
  Gloves: number;
  Head: number;
  ID: number;
  Legs: number;
  MainHand: number;
  Neck: number;
  OffHand: string;
  SoulCrystal: number;
  Waist: number;
  Wrists: number;
}

export interface Relation {
  classJobCategory: ClassJobCategory;
  quests: Quest[];
  items: Item[];
  achievements: Achievement[];
}

export interface Tooltip {
  id: number;
  tooltipId: string;
  urlType: string;
}

declare module '*/assets/data/garlandtools/summary-achievements.json' {
  const value: SummaryAchievement[];
  export = value;
}

declare module '*/assets/data/garlandtools/achievements.json' {
  const value: Achievement[];
  export = value;
}

declare module '*/assets/data/garlandtools/summary-quests.json' {
  const value: SummaryQuest[];
  export = value;
}

declare module '*/assets/data/garlandtools/quests.json' {
  const value: Quest[];
  export = value;
}

declare module '*/assets/data/xivapi/items.json' {
  const value: Item[];
  export = value;
}

declare module '*/assets/data/local/relations.json' {
  const value: Relation[];
  export = value;
}

declare module '*/assets/data/local/tooltips.json' {
  const value: Tooltip[];
  export = value;
}
