import { Injectable } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { StorageCharacterModel } from '../model/localstorage.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocalstorageStore {
  private _selectedCharacterSubject: BehaviorSubject<StorageCharacterModel> =
    new BehaviorSubject({} as StorageCharacterModel);

  constructor(private _localStorageService: LocalStorageService) {}

  public get characters(): StorageCharacterModel[] {
    const characters = this._localStorageService.getItem('characters');
    return characters ? characters : [];
  }

  public set characters(value: StorageCharacterModel[]) {
    this._localStorageService.setItem('characters', value);
  }

  public get selectedCharacter(): StorageCharacterModel {
    return this._selectedCharacterSubject.getValue();
  }

  public set selectedCharacter(value: StorageCharacterModel) {
    this._selectedCharacterSubject.next(value);
  }

  public setCharacter(value: StorageCharacterModel): void {
    const characters = this.characters.filter(
      (character) => character.data.Character.ID !== value.data.Character.ID
    );
    characters.push(value);
    this.characters = characters;
  }
}
