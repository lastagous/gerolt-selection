import { Injectable } from '@angular/core';
import { StepByStepStore } from '../component/step-by-step/step-by-step.store';
import { Util } from '../util/util';
import { StorageCharacterModel } from '../model/localstorage.model';

@Injectable()
export class ProgressStore {
  constructor(private _stepByStepStore: StepByStepStore) {}

  public getJobRate(weapon: string, job: string, character: StorageCharacterModel): number {
    const level = Util.getLevel(weapon);
    const achievements = this._stepByStepStore.relations
      .filter((relation) => relation.classJobCategory.Name == job && relation.items[0]?.LevelEquip == level)
      .flatMap((relation) => relation.achievements.map((achievement) => achievement.achievement.id));
    if (character.collect) {
      const completeAchievements = character.collect.achievements
        .filter((achievement) => achievements.includes(achievement.id))
        .map((achievement) => achievement.id);
      return completeAchievements.length / achievements.length;
    } else if (character.data?.Achievements) {
      const completeAchievements = character.data.Achievements.List.filter((achievement) =>
        achievements.includes(achievement.ID)
      ).map((achievement) => achievement.ID);
      return completeAchievements.length / achievements.length;
    } else {
      return 0;
    }
  }

  public getWeaponRate(weapon: string, character: StorageCharacterModel): number {
    return (
      Util.getJobs(weapon).reduce((total, job) => this.getJobRate(weapon, job, character) + total, 0) /
      Util.getJobs(weapon).length
    );
  }

  public getChartCssText(per: number): string {
    const angle = Math.trunc(360 * per);
    return angle == 0
      ? 'conic-gradient(var(--surface-400) 0deg 360deg)'
      : `conic-gradient(var(--orange-400) 0deg ${angle}deg, var(--surface-400) ${angle}deg 360deg)`;
  }

  public getShareText(character: StorageCharacterModel): string {
    let completeRate = '';
    let totalRaito = 0;
    this._stepByStepStore.weapons.forEach((weapon) => {
      const raito = this.getWeaponRate(weapon, character);
      totalRaito += raito;
      const totalBlocks = 8;
      const blockNum = Math.floor(raito / (1 / totalBlocks));
      const block = '■';
      const none = '・';
      completeRate += `${weapon} [${block.repeat(blockNum)}${none.repeat(totalBlocks - blockNum)}] ${Math.floor(
        raito * 100
      )}%\n`;
    });
    const characterName = character.collect
      ? character.collect.character.name
      : character.data
      ? character.data.Character.Name
      : '';

    return `${characterName} の武器生成の達成度 ${Math.floor(
      (totalRaito * 100) / this._stepByStepStore.weapons.length
    )}%\n\n${completeRate}`;
  }
}
