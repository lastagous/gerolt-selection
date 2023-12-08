import { Injectable } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';
import { StorageCharacterModel } from '../model/localstorage.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocalstorageStore {
  private _charactersSubject: BehaviorSubject<StorageCharacterModel[]> = new BehaviorSubject(
    [] as StorageCharacterModel[]
  );
  private _selectedCharacterSubject: BehaviorSubject<StorageCharacterModel> = new BehaviorSubject(
    {} as StorageCharacterModel
  );

  constructor(private _localStorageService: LocalStorageService) {
    const characters = this._localStorageService.getItem('characters');
    this._charactersSubject.next(characters ? characters : []);
  }

  public get characters(): StorageCharacterModel[] {
    return this._charactersSubject.getValue();
  }

  public set characters(value: StorageCharacterModel[]) {
    this._charactersSubject.next(value);
    this._localStorageService.setItem('characters', value);
  }

  public get selectedCharacter(): StorageCharacterModel {
    return this._selectedCharacterSubject.getValue();
  }

  public set selectedCharacter(value: StorageCharacterModel) {
    this._selectedCharacterSubject.next(value);
  }

  public setCharacter(value: StorageCharacterModel): void {
    const id = value.collect ? value.collect.character.id : value.data ? value.data.Character.ID : 0;
    const characters = this.characters.filter(
      (character) => character.data?.Character.ID !== id || character.collect?.character.id !== id
    );
    this.characters = [value].concat(characters);
    this.selectedCharacter = value;
  }

  public removeCharacter(id: number): void {
    const characters = this.characters.filter(
      (character) => character.data?.Character.ID !== id || character.collect?.character.id !== id
    );
    this.characters = characters;
    if (this.selectedCharacter.data?.Character.ID === id) {
      this.selectedCharacter = {} as StorageCharacterModel;
    }
  }
}
