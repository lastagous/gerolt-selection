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

export interface SummaryInstance {
  i: number;
  n: string;
  c: number;
  t: string;
  min_lvl: number;
  max_lvl: number;
  min_ilvl?: number;
  max_ilvl?: number;
}

export interface Instance {
  instance: InstanceDetail;
  partials?: InstancePartial[];
}

export interface InstanceDetail {
  name: string;
  category: string;
  description?: string;
  id: number;
  patch: number;
  categoryIcon: number;
  time: number;
  min_lvl: number;
  fullIcon?: number;
  healer: number;
  tank: number;
  ranged: number;
  melee: number;
  max_lvl: number;
  fights?: Fight[];
  coffers?: Coffer2[];
  unlockedByQuest?: number;
  rewards?: number[];
  requiredForQuest?: number[];
  min_ilvl?: number;
  max_ilvl?: number;
  currency?: Currency2[];
}

export interface Fight {
  type: string;
  currency?: Currency[];
  coffer?: Coffer;
  mobs?: number[];
}

export interface Currency {
  id: number;
  amount: any;
}

export interface Coffer {
  items: number[];
}

export interface Coffer2 {
  items: number[];
  coords: any[];
}

export interface Currency2 {
  id: number;
  amount: number;
}

export interface InstancePartial {
  type: string;
  id: string;
  obj: InstanceObj;
}

export interface InstanceObj {
  i: number;
  n: string;
  l: any;
  c?: number;
  t: any;
  g?: number;
  s?: number;
  f?: number;
  z?: number;
  p?: number;
  materia?: Materia;
}

export interface Materia {
  tier: number;
  value: number;
  attr: string;
  category: number;
  advancedMeldingForbidden?: number;
}

export interface Npc {
  npc: NpcDetail;
  partials: NpcPartial[];
}

export interface NpcDetail {
  name: string;
  id: number;
  patch: number;
  coords: number[];
  zoneid: number;
  areaid?: number;
  appearance?: Appearance;
  quests: number[];
  equipment?: Equipment[];
  title?: string;
  alts?: number[];
  tripletriad?: Tripletriad;
}

export interface Appearance {
  gender: string;
  race: string;
  tribe: string;
  height: number;
  face: number;
  jaw: number;
  eyebrows: number;
  nose: number;
  skinColor: string;
  skinColorCode: string;
  muscle?: number;
  hairStyle?: number;
  hairColor: string;
  hairColorCode: string;
  eyeSize: string;
  eyeShape: number;
  eyeColor: string;
  eyeColorCode: string;
  mouth: number;
  facialfeatures?: number[];
  facialfeatureColor?: string;
  facialfeatureColorCode?: string;
  customFace?: number;
  highlightColor?: string;
  highlightColorCode?: string;
  hairstyleItem?: number;
  extraFeatureName?: string;
  extraFeatureShape?: number;
  extraFeatureSize?: number;
  heterochromia?: string;
  heterochromiaCode?: string;
  facepaint?: number;
  facepaintShade?: string;
  facepaintColor?: string;
  facepaintColorCode?: string;
  bust?: number;
  lipShade?: string;
  lipColor?: string;
  lipColorCode?: string;
  bodyType?: string;
  facepaintReverse?: number;
}

export interface Equipment {
  slot: number;
  model: string;
  id?: number;
  uncertainty?: number;
  dye?: number;
}

export interface Tripletriad {
  fee: number;
  cards: number[];
  rules: string[];
  rewards: number[];
}

export interface NpcPartial {
  type: string;
  id: string;
  obj: NpcObj;
}

export interface NpcObj {
  i: number;
  n?: string;
  g?: number;
  l: any;
  s?: number;
  f?: number;
  c: any;
  t: any;
  p?: number;
  q?: number;
  r?: number;
  a?: number;
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
