import { Component } from '@angular/core';
import { XivapiCharacterModel } from 'src/app/model/xivapi-character.model';
import { ProgressPanelStore } from 'src/app/store/progress-panel.store';
import { XivapiStore } from 'src/app/store/xivapi.store';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.less'],
})
export class CharacterListComponent {
  constructor(
    private _progressPanelStore: ProgressPanelStore,
    private _xivapiStore: XivapiStore
  ) {}

  public get characters(): XivapiCharacterModel[] {
    return this._xivapiStore.characters;
  }

  public get selectedCharacter(): XivapiCharacterModel {
    return this._xivapiStore.selectedCharacter;
  }

  public set selectedCharacter(value: XivapiCharacterModel) {
    this._xivapiStore.selectedCharacter = value;
  }

  public get isCharacterFetcing(): boolean {
    return this._xivapiStore.isCharacterFetcing;
  }

  public isUndisclosedAchievements(character: XivapiCharacterModel): boolean {
    return (
      character.AchievementsPublic === false ||
      character.Achievements?.Points === 0
    );
  }

  public onShareClick(character: XivapiCharacterModel): void {
    const share = 'https://lastagous.github.io/gerolt-selection/';
    let completeRate = '';
    let totalRaito = 0;
    this._progressPanelStore.tabItems.forEach((tabItem) => {
      const raito = this._progressPanelStore.getCompleteRate(
        tabItem.label,
        character
      );
      totalRaito += raito;
      const totalBlocks = 8;
      const blockNum = Math.floor(raito / (1 / totalBlocks));
      const block = '■';
      const none = '・';
      completeRate += `${tabItem.label} [${block.repeat(blockNum)}${none.repeat(
        totalBlocks - blockNum
      )}] ${Math.floor(raito * 100)}%\n`;
    });
    const tweet = `${character.Character.Name} の武器生成の達成度 ${Math.floor(
      (totalRaito * 100) / this._progressPanelStore.tabItems.length
    )}%\n\n`;
    const hashtags = 'FF14,ゲロルトの工匠記録';
    const url = `https://twitter.com/intent/tweet?url=${share}&text=${tweet}${completeRate}&hashtags=${hashtags}`;
    window.open(encodeURI(url), '_blank');
  }
}
