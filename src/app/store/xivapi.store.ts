import { Injectable } from '@angular/core';
import { XivapiService } from '../service/xivapi.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { XivapiCharacterModel } from '../model/xivapi-character.model';
import { MessageService } from 'primeng/api';
import { LocalstorageStore } from './local-storage.store';
import { StorageCharacterModel } from '../model/localstorage.model';

@Injectable()
export class XivapiStore {
  private _charactersSubject: BehaviorSubject<XivapiCharacterModel[]> =
    new BehaviorSubject([] as XivapiCharacterModel[]);
  private _isCharacterFetcing = false;

  constructor(
    private _localStorageStore: LocalstorageStore,
    private _messageService: MessageService,
    private _xivapiService: XivapiService
  ) {}

  public get characters(): XivapiCharacterModel[] {
    return this._charactersSubject.getValue();
  }

  public get isCharacterFetcing(): boolean {
    return this._isCharacterFetcing;
  }

  public async getCharacter(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._isCharacterFetcing = true;
      this._xivapiService.getCharactor(id).subscribe(
        (character) => {
          console.log(character);
          const characters = this._charactersSubject
            .getValue()
            .filter((char) => char.Character.ID !== character.Character.ID);
          characters.push(character);
          this._charactersSubject.next(characters);

          this._localStorageStore.setCharacter({
            data: character,
            updateTimestamp: Math.floor(new Date().getTime() / 1000),
          } as StorageCharacterModel);
          this._isCharacterFetcing = false;
          resolve();
        },
        (error) => {
          console.log(error);
          this._messageService.add({
            severity: 'error',
            detail: error.error.Message,
          });
          this._isCharacterFetcing = false;
          resolve();
        }
      );
    });
  }

  public search(payload: any): Observable<Object> {
    return this._xivapiService.search(payload);
  }
}
