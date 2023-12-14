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

export type Root = Root2[];

export interface Root2 {
  item: Item;
  partials?: Partial[];
  ingredients?: Ingredient2[];
}

export interface Item {
  name: string;
  id: number;
  patch: number;
  patchCategory: number;
  price: number;
  ilvl: number;
  category: number;
  tradeable?: number;
  sell_price?: number;
  rarity: number;
  stackSize: number;
  icon: number;
  quests?: number[];
  materia?: Materia;
  voyages?: string[];
  description?: string;
  unlistable?: number;
  tradeCurrency?: TradeCurrency[];
  tradeShops?: TradeShop[];
  usedInQuest?: number[];
  treasure?: number[];
  fates?: number[];
  other?: string[];
  unique?: number;
  instances?: number[];
  jobCategories?: string;
  convertable?: number;
  repair?: number;
  equip?: number;
  repair_item?: number;
  slot?: number;
  elvl?: number;
  jobs?: number;
  models?: string[];
  attr?: Attr;
  sharedModels?: number[];
  vendors?: number[];
  relic?: number;
  upgrades?: number[];
  crestworthy?: number;
  downgrades?: number[];
  dyeable?: number;
  sockets?: number;
  advancedMeldingForbidden?: number;
  glamourous?: number;
  attr_max?: AttrMax;
  special?: Special;
  delivery?: number;
  attr_hq?: AttrHq;
  craft?: Craft[];
  storable?: number;
  minionrace?: string;
  tooltip?: string;
  minionskilltype?: string;
  specialactionname?: string;
  specialactiondescription?: string;
  cost?: number;
  skill_angle?: number;
  strengths?: string[];
  fieldnote?: Fieldnote;
}

export interface Materia {
  tier: number;
  value: number;
  attr: string;
  category: number;
  advancedMeldingForbidden?: number;
}

export interface TradeCurrency {
  shop: string;
  npcs: number[];
  listings: Listing[];
}

export interface Listing {
  item: Item2[];
  currency: ItemCurrency[];
}

export interface Item2 {
  id: string;
  amount: number;
}

export interface ItemCurrency {
  id: string;
  amount: number;
}

export interface TradeShop {
  shop: string;
  npcs: number[];
  listings: Listing2[];
}

export interface Listing2 {
  item: Item3[];
  currency: ItemCurrency2[];
}

export interface Item3 {
  id: string;
  amount: number;
}

export interface ItemCurrency2 {
  id: string;
  amount: number;
}

export interface Attr {
  'Block Strength'?: number;
  'Block Rate'?: number;
  Strength?: number;
  Vitality?: number;
  'Physical Damage'?: number;
  'Magic Damage'?: number;
  Delay?: number;
  Dexterity?: number;
  Intelligence?: number;
  Mind?: number;
  Determination?: number;
  Tenacity?: number;
  'Critical Hit'?: number;
  'Spell Speed'?: number;
  'Direct Hit Rate'?: number;
  HP?: number;
  'Skill Cost'?: number;
  Attack?: number;
  Defense?: number;
  Speed?: number;
  Piety?: number;
  'Skill Speed'?: number;
  'Magic Defense'?: number;
}

export interface AttrMax {
  Strength?: number;
  Intelligence?: number;
  Mind?: number;
  Piety?: number;
  GP: number;
  CP: number;
  Tenacity?: number;
  'Direct Hit Rate'?: number;
  'Fire Resistance': number;
  'Ice Resistance': number;
  'Wind Resistance': number;
  'Earth Resistance': number;
  'Lightning Resistance': number;
  'Water Resistance': number;
  Determination?: number;
  'Skill Speed'?: number;
  'Spell Speed'?: number;
  'Slow Resistance': number;
  'Petrification Resistance': number;
  'Paralysis Resistance': number;
  'Silence Resistance': number;
  'Blind Resistance': number;
  'Poison Resistance': number;
  'Stun Resistance': number;
  'Sleep Resistance': number;
  'Bind Resistance': number;
  'Heavy Resistance': number;
  'Doom Resistance': number;
  Craftsmanship: number;
  Control: number;
  Gathering: number;
  Perception: number;
  Dexterity?: number;
  'Critical Hit'?: number;
  Vitality?: number;
  Defense?: number;
  'Magic Defense'?: number;
}

export interface Special {
  bonusId: number;
  attr: Attr2[];
}

export interface Attr2 {
  name: string;
  value: number;
  index: number;
}

export interface AttrHq {
  'Physical Damage': number;
  'Magic Damage': number;
  Dexterity?: number;
  Vitality: number;
  'Direct Hit Rate'?: number;
  'Critical Hit'?: number;
  Intelligence?: number;
  'Spell Speed'?: number;
  Determination?: number;
  Mind?: number;
  Piety?: number;
  Strength?: number;
  'Skill Speed'?: number;
  Tenacity?: number;
}

export interface Craft {
  id: number;
  job: number;
  rlvl: number;
  durability: number;
  quality: number;
  progress: number;
  lvl: number;
  suggestedCraftsmanship: number;
  suggestedControl: number;
  materialQualityFactor: number;
  stars: number;
  hq: number;
  controlReq: number;
  craftsmanshipReq?: number;
  unlockId?: number;
  ingredients: Ingredient[];
  complexity: Complexity;
  quickSynth?: number;
  quickSynthControl?: number;
}

export interface Ingredient {
  id: number;
  amount: number;
  quality?: number;
}

export interface Complexity {
  nq: number;
  hq: number;
}

export interface Fieldnote {
  id: number;
  name: string;
  description: string;
  icon: number;
  image: number;
  rarity: number;
}

export interface Partial {
  type: string;
  id: string;
  obj: Obj;
}

export interface Obj {
  i: number;
  n: string;
  g?: number;
  l: any;
  s?: number;
  f?: number;
  r?: number;
  a?: number;
  c: any;
  t: any;
  q?: number;
  z?: number;
  lt?: string;
  ti?: number[];
  p?: number;
  x?: number;
  y?: number;
  min_lvl?: number;
  max_lvl?: number;
  min_ilvl?: number;
  max_ilvl?: number;
}

export interface Ingredient2 {
  name: string;
  id: number;
  icon: number;
  category: number;
  ilvl: number;
  price: number;
  instances?: number[];
  leves?: number[];
  craft?: Craft2[];
  tradeShops?: TradeShop2[];
  ventures?: number[];
  nodes?: number[];
  vendors?: number[];
  drops?: number[];
  treasure?: number[];
  voyages?: string[];
  desynthedFrom?: number[];
  fishingSpots?: number[];
  seeds?: number[];
}

export interface Craft2 {
  id: number;
  job: number;
  rlvl: number;
  durability: number;
  quality: number;
  progress: number;
  lvl: number;
  suggestedCraftsmanship: number;
  suggestedControl: number;
  materialQualityFactor: number;
  yield?: number;
  hq: number;
  quickSynth: number;
  ingredients: Ingredient3[];
  complexity: Complexity2;
  stars?: number;
  craftsmanshipReq?: number;
  quickSynthCraftsmanship?: number;
}

export interface Ingredient3 {
  id: number;
  amount: number;
  quality?: number;
}

export interface Complexity2 {
  nq: number;
  hq: number;
}

export interface TradeShop2 {
  shop: string;
  npcs: number[];
  listings: Listing3[];
}

export interface Listing3 {
  item: Item4[];
  currency: Currency3[];
}

export interface Item4 {
  id: string;
  amount: number;
}

export interface Currency3 {
  id: string;
  amount: number;
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
