import { XivapiCharacterModel } from './xivapi-character.model';

export interface CharacterModel {
  character: XivapiCharacterModel;
  updateTimestamp: number;
}
