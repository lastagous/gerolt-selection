export interface ItemModel {
  ClassJobCategory: ClassJobCategory;
  ID: number;
  IconHD: string;
  IconID: number;
  LevelItem: number;
  Name_ja: string;
}

export interface ClassJobCategory {
  Name_en: string;
  Name_ja: string;
}

export interface AchievementModel {
  AchievementCategory: AchievementCategory;
  Description_ja: string;
  GamePatch: GamePatch;
  ID: number;
  IconHD: string;
  IconID: number;
  Name_ja: string;
}

export interface AchievementCategory {
  Name_ja: string;
}

export interface GamePatch {
  ReleaseDate: number;
  Version: string;
}

export interface TabItem {
  label: string;
  title: string;
  achievements: AchievementModel[];
  viewMap: Map<string, JobAchievementViewModel[]>;
}

export interface JobAchievementViewModel {
  JobName: string;
  Version: string;
  Achivement: AchievementModel;
  Items: ItemModel[];
}
