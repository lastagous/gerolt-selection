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

  public get isCharacterFetcing(): boolean {
    return this._xivapiStore.isCharacterFetcing;
  }
}
