export interface FFxivCollectCharacterModel {
  id: number;
  name: string;
  server: string;
  data_center: string;
  portrait: string;
  avatar: string;
  last_parsed: string;
  verified: boolean;
  achievements: Achievements;
  mounts: Mounts;
  minions: Minions;
  orchestrions: Orchestrions;
  spells: Spells;
  emotes: Emotes;
  bardings: Bardings;
  hairstyles: Hairstyles;
  armoires: Armoires;
  fashions: Fashions;
  records: Records;
  survey_records: SurveyRecords;
  rankings: Rankings;
  relics: Relics;
}

export interface Achievements {
  count: number;
  total: number;
  points: number;
  points_total: number;
  ranked_points: number;
  ranked_points_total: number;
  ranked_time: string;
  public: boolean;
}

export interface Mounts {
  count: number;
  total: number;
  ranked_count: number;
  ranked_total: number;
}

export interface Minions {
  count: number;
  total: number;
  ranked_count: number;
  ranked_total: number;
}

export interface Orchestrions {
  count: number;
  total: number;
}

export interface Spells {
  count: number;
  total: number;
}

export interface Emotes {
  count: number;
  total: number;
}

export interface Bardings {
  count: number;
  total: number;
}

export interface Hairstyles {
  count: number;
  total: number;
}

export interface Armoires {
  count: number;
  total: number;
}

export interface Fashions {
  count: number;
  total: number;
}

export interface Records {
  count: number;
  total: number;
}

export interface SurveyRecords {
  count: number;
  total: number;
}

export interface Rankings {
  achievements: Achievements2;
  mounts: Mounts2;
  minions: Minions2;
}

export interface Achievements2 {
  server: number;
  data_center: number;
  global: number;
}

export interface Mounts2 {
  server: number;
  data_center: number;
  global: number;
}

export interface Minions2 {
  server: number;
  data_center: number;
  global: number;
}

export interface Relics {
  weapons: Weapons;
  armor: Armor;
  tools: Tools;
}

export interface Weapons {
  count: number;
  total: number;
}

export interface Armor {
  count: number;
  total: number;
}

export interface Tools {
  count: number;
  total: number;
}

export interface FFxivCollectAchievementModel {
  id: number;
  name: string;
  description: string;
  points: number;
  order: number;
  patch: string;
  owned: string;
  icon: string;
  category: Category;
  type: Type;
  reward?: Reward;
}

export interface Category {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface Reward {
  type: string;
  title?: Title;
  name?: string;
}

export interface Title {
  id: number;
  name: string;
  female_name: string;
  order: number;
  patch: string;
  owned: string;
  icon: string;
}
