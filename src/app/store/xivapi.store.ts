import { Injectable } from '@angular/core';
import { XivapiService } from '../service/xivapi.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CharacterModel } from '../model/xivapi-character.model';
import { CookieStore } from './cookie.store';

@Injectable()
export class XivapiStore {
  private _charactersSubject: BehaviorSubject<CharacterModel[]> =
    new BehaviorSubject([] as CharacterModel[]);
  private _selectedCharacterSubject: BehaviorSubject<CharacterModel> =
    new BehaviorSubject({} as CharacterModel);
  private _isCharacterFetcing = false;

  constructor(
    private _cookieStore: CookieStore,
    private _xivapiService: XivapiService
  ) {}

  public get characters(): CharacterModel[] {
    return this._charactersSubject.getValue();
  }

  public get selectedCharacter(): CharacterModel {
    return this._selectedCharacterSubject.getValue();
  }

  public set selectedCharacter(value: CharacterModel) {
    this._selectedCharacterSubject.next(value);
  }

  public get isCharacterFetcing(): boolean {
    return this._isCharacterFetcing;
  }

  public async getCharacter(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._isCharacterFetcing = true;
      this._xivapiService.getCharactor(id).subscribe((character) => {
        console.log(character);
        const characters = this._charactersSubject.getValue();
        characters.push(character);
        this._charactersSubject.next(characters);
        this._cookieStore.setCharacter({
          Avatar: character.Character.Avatar,
          ID: character.Character.ID,
          Name: character.Character.Name,
        });
        this._isCharacterFetcing = false;
        resolve();
      });
    });
  }

  public search(payload: any): Observable<Object> {
    return this._xivapiService.search(payload);
  }
}
