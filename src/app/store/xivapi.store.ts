import { Injectable } from '@angular/core';
import { XivapiService } from '../service/xivapi.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CharacterModel } from '../model/xivapi-character.model';

@Injectable()
export class XivapiStore {
  private _charactersSubject: BehaviorSubject<CharacterModel[]> =
    new BehaviorSubject([] as CharacterModel[]);
  private _isCharacterFetcing = false;

  constructor(private _xivapiService: XivapiService) {}

  public get characters(): CharacterModel[] {
    return this._charactersSubject.getValue();
  }

  public get isCharacterFetcing(): boolean {
    return this._isCharacterFetcing;
  }

  public getCharacter(id: string): Subscription {
    this._isCharacterFetcing = true;
    return this._xivapiService.getCharactor(id).subscribe((character) => {
      console.log(character);
      const characters = this._charactersSubject.getValue();
      characters.push(character);
      this._charactersSubject.next(characters);
      console.log(this.characters);
      this._isCharacterFetcing = false;
    });
  }
}
