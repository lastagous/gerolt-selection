import { XivapiCharacterModel } from './xivapi-character.model';

export interface StorageCharacterModel {
  data: XivapiCharacterModel;
  updateTimestamp: number;
}
