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
  viewList: JobAchievementViewModel[];
}

export interface JobAchievementViewModel {
  JobNameEn: string;
  JobNameJa: string;
  itemAchievementPares: ItemAchievementPareModel[];
}

export interface ItemAchievementPareModel {
  Version: string;
  Achivement: AchievementModel;
  Items: ItemModel[];
}
