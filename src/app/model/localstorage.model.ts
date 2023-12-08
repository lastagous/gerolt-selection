import { FFxivCollectAchievementModel, FFxivCollectCharacterModel } from './ffxivcollect-character.model';
import { XivapiCharacterModel } from './xivapi-character.model';

export interface StorageCharacterModel {
  data: XivapiCharacterModel | undefined;
  updateTimestamp: number;
  collect: FFxivCollectStorageModel | undefined;
}

export interface FFxivCollectStorageModel {
  character: FFxivCollectCharacterModel;
  achievements: FFxivCollectAchievementModel[];
}
