import { Component } from '@angular/core';
import { StorageCharacterModel } from 'src/app/model/localstorage.model';
import { FFxivCollectStore } from 'src/app/store/ffxivcollect.store';
import { LocalstorageStore } from 'src/app/store/local-storage.store';
import { ProgressStore } from 'src/app/store/progress.store';
import { XivapiStore } from 'src/app/store/xivapi.store';

@Component({
  selector: 'app-selected-character',
  templateUrl: './selected-character.component.html',
  styleUrls: ['./selected-character.component.less'],
})
export class SelectedCharacterComponent {
  constructor(
    private _localStorageStore: LocalstorageStore,
    private _xivapiStore: XivapiStore,
    private _ffxivCollectStore: FFxivCollectStore,
    private _progressStore: ProgressStore
  ) {}

  public get selectedCharacter(): StorageCharacterModel {
    return this._localStorageStore.selectedCharacter;
  }

  public getCharacterAvaterSrc(character: StorageCharacterModel): string {
    return character.collect
      ? character.collect.character.avatar
      : character.data
      ? character.data.Character.Avatar
      : '';
  }

  public getCharacterName(character: StorageCharacterModel): string {
    return character.collect ? character.collect.character.name : character.data ? character.data.Character.Name : '';
  }

  public getUpdateTime(timestamp: number): number {
    const timeDiff = new Date().getTime() - new Date(timestamp * 1000).getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  public isUndisclosedAchievements(character: StorageCharacterModel): boolean {
    return character.collect
      ? !character.collect.character.achievements.public
      : character.data
      ? character.data.AchievementsPublic === false || character.data.Achievements?.Points === 0
      : true;
  }

  public onSearchButtonClick(character: StorageCharacterModel): void {
    const id = character.collect ? character.collect.character.id : character.data?.Character.ID;
    // this._xivapiStore.getCharacter(String(id));
    this._ffxivCollectStore.getCharacter(String(id));
  }

  public onSearchRemoveClick(character: StorageCharacterModel): void {
    const id = character.collect ? character.collect.character.id : character.data ? character.data.Character.ID : 0;
    this._localStorageStore.removeCharacter(id);
  }

  public onShareClick(character: StorageCharacterModel): void {
    const share = 'https://lastagous.github.io/gerolt-selection/';
    const hashtags = 'FF14,ゲロルトの工匠記録';
    const post = this._progressStore.getShareText(character);
    const url = `https://twitter.com/intent/tweet?url=${share}&text=${post}&hashtags=${hashtags}`;
    window.open(encodeURI(url), '_blank');
  }
}
