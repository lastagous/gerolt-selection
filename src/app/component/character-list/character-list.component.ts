import { Component } from '@angular/core';
import { StorageCharacterModel } from 'src/app/model/localstorage.model';
import { XivapiCharacterModel } from 'src/app/model/xivapi-character.model';
import { LocalstorageStore } from 'src/app/store/local-storage.store';
import { ProgressPanelStore } from 'src/app/store/progress-panel.store';
import { XivapiStore } from 'src/app/store/xivapi.store';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.less'],
})
export class CharacterListComponent {
  constructor(
    private _localStorageStore: LocalstorageStore,
    private _progressPanelStore: ProgressPanelStore,
    private _xivapiStore: XivapiStore
  ) {}

  public get characters(): StorageCharacterModel[] {
    return this._localStorageStore.characters;
  }

  public get selectedCharacter(): StorageCharacterModel {
    return this._localStorageStore.selectedCharacter;
  }

  public set selectedCharacter(value: StorageCharacterModel) {
    this._localStorageStore.selectedCharacter = value;
  }

  public get isCharacterFetcing(): boolean {
    return this._xivapiStore.isCharacterFetcing;
  }

  public getUpdateTime(timestamp: number): number {
    const timeDiff =
      new Date().getTime() - new Date(timestamp * 1000).getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  public isSelected(character: StorageCharacterModel) {
    return (
      character.data.Character.ID ===
        this._localStorageStore.selectedCharacter.data?.Character.ID &&
      !this.isUndisclosedAchievements(character.data)
    );
  }

  public isUndisclosedAchievements(character: XivapiCharacterModel): boolean {
    return (
      character.AchievementsPublic === false ||
      character.Achievements?.Points === 0
    );
  }

  public onCharacterSelected(character: StorageCharacterModel) {
    if (!this.isUndisclosedAchievements(character.data)) {
      this._localStorageStore.selectedCharacter = character;
    }
  }

  public onSearchButtonClick(id: number): void {
    this._xivapiStore.getCharacter(String(id));
  }

  public onSearchRemoveClick(id: number): void {
    this._localStorageStore.removeCharacter(id);
  }

  public onShareClick(character: XivapiCharacterModel): void {
    const share = 'https://lastagous.github.io/gerolt-selection/';
    let completeRate = '';
    let totalRaito = 0;
    this._progressPanelStore.menuItems.forEach((menuItem) => {
      const raito = this._progressPanelStore.getCompleteRate(
        menuItem.label ? menuItem.label : '',
        character
      );
      totalRaito += raito;
      const totalBlocks = 8;
      const blockNum = Math.floor(raito / (1 / totalBlocks));
      const block = '■';
      const none = '・';
      completeRate += `${menuItem.label} [${block.repeat(
        blockNum
      )}${none.repeat(totalBlocks - blockNum)}] ${Math.floor(raito * 100)}%\n`;
    });
    const tweet = `${character.Character.Name} の武器生成の達成度 ${Math.floor(
      (totalRaito * 100) / this._progressPanelStore.menuItems.length
    )}%\n\n`;
    const hashtags = 'FF14,ゲロルトの工匠記録';
    const url = `https://twitter.com/intent/tweet?url=${share}&text=${tweet}${completeRate}&hashtags=${hashtags}`;
    window.open(encodeURI(url), '_blank');
  }
}
