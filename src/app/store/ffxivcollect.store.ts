import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LocalstorageStore } from './local-storage.store';
import { FFxivCollectStorageModel, StorageCharacterModel } from '../model/localstorage.model';
import { FFxivCollectCharacterModel } from '../model/ffxivcollect-character.model';
import { FFxivCollectService } from '../service/ffxivcollect.service';

@Injectable()
export class FFxivCollectStore {
  private _charactersSubject: BehaviorSubject<FFxivCollectCharacterModel[]> = new BehaviorSubject(
    [] as FFxivCollectCharacterModel[]
  );
  private _isCharacterFetcing = false;

  constructor(
    private _localStorageStore: LocalstorageStore,
    private _messageService: MessageService,
    private _ffxicCollectService: FFxivCollectService
  ) {}

  public get characters(): FFxivCollectCharacterModel[] {
    return this._charactersSubject.getValue();
  }

  public get isCharacterFetcing(): boolean {
    return this._isCharacterFetcing;
  }

  public async getCharacter(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._isCharacterFetcing = true;
      this._ffxicCollectService.getCharactor(id).subscribe(
        (character) => {
          console.log(character);
          const characters = this._charactersSubject.getValue().filter((char) => char.id !== character.id);
          characters.push(character);
          this._charactersSubject.next(characters);
          this._ffxicCollectService.getAchievements(id).subscribe(
            (achievements) => {
              this._localStorageStore.setCharacter({
                updateTimestamp: Math.floor(new Date().getTime() / 1000),
                collect: {
                  character: character,
                  achievements: achievements,
                } as FFxivCollectStorageModel,
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
}
