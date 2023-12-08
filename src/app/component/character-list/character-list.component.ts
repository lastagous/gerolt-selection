import { Component } from '@angular/core';
import { StorageCharacterModel } from 'src/app/model/localstorage.model';
import { FFxivCollectStore } from 'src/app/store/ffxivcollect.store';
import { LocalstorageStore } from 'src/app/store/local-storage.store';
import { XivapiStore } from 'src/app/store/xivapi.store';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.less'],
})
export class CharacterListComponent {
  constructor(
    private _localStorageStore: LocalstorageStore,
    private _xivapiStore: XivapiStore,
    private _ffxivCollectStore: FFxivCollectStore
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

  public isSelected(character: StorageCharacterModel) {
    const selectedId = this._localStorageStore.selectedCharacter.collect
      ? this._localStorageStore.selectedCharacter.collect.character.id
      : this._localStorageStore.selectedCharacter.data?.Character.ID;
    return character.collect
      ? character.collect.character.id == selectedId
      : character.data?.Character.ID === selectedId && !this.isUndisclosedAchievements(character);
  }

  public isUndisclosedAchievements(character: StorageCharacterModel): boolean {
    return character.collect
      ? !character.collect.character.achievements.public
      : character.data
      ? character.data.AchievementsPublic === false || character.data.Achievements?.Points === 0
      : true;
  }

  public onCharacterSelected(character: StorageCharacterModel) {
    if (!this.isUndisclosedAchievements(character)) {
      this._localStorageStore.selectedCharacter = character;
    }
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
    // const share = 'https://lastagous.github.io/gerolt-selection/';
    // let completeRate = '';
    // let totalRaito = 0;
    // this._progressPanelStore.menuItems.forEach((menuItem) => {
    //   const raito = this._progressPanelStore.getCompleteRate(
    //     menuItem.label ? menuItem.label : '',
    //     character
    //   );
    //   totalRaito += raito;
    //   const totalBlocks = 8;
    //   const blockNum = Math.floor(raito / (1 / totalBlocks));
    //   const block = '■';
    //   const none = '・';
    //   completeRate += `${menuItem.label} [${block.repeat(
    //     blockNum
    //   )}${none.repeat(totalBlocks - blockNum)}] ${Math.floor(raito * 100)}%\n`;
    // });
    // const tweet = `${character.Character.Name} の武器生成の達成度 ${Math.floor(
    //   (totalRaito * 100) / this._progressPanelStore.menuItems.length
    // )}%\n\n`;
    // const hashtags = 'FF14,ゲロルトの工匠記録';
    // const url = `https://twitter.com/intent/tweet?url=${share}&text=${tweet}${completeRate}&hashtags=${hashtags}`;
    // window.open(encodeURI(url), '_blank');
  }
}
