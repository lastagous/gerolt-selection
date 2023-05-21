import { Component } from '@angular/core';
import { CharacterModel } from 'src/app/model/xivapi-character.model';
import { XivapiStore } from 'src/app/store/xivapi.store';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.less'],
})
export class CharacterListComponent {
  constructor(private _xivapiStore: XivapiStore) {}

  public get characters(): CharacterModel[] {
    return this._xivapiStore.characters;
  }

  public get selectedCharacter(): CharacterModel {
    return this._xivapiStore.selectedCharacter;
  }

  public set selectedCharacter(value: CharacterModel) {
    this._xivapiStore.selectedCharacter = value;
  }

  public get isCharacterFetcing(): boolean {
    return this._xivapiStore.isCharacterFetcing;
  }

  public isUndisclosedAchievements(character: CharacterModel): boolean {
    return (
      character.AchievementsPublic === false ||
      character.Achievements?.Points === 0
    );
  }
}
