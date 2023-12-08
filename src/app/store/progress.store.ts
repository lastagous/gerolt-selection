import { Injectable } from '@angular/core';
import { LocalstorageStore } from './local-storage.store';
import { StepByStepStore } from '../component/step-by-step/step-by-step.store';
import { Util } from '../util/util';

@Injectable()
export class ProgressStore {
  constructor(private _localStorageStore: LocalstorageStore, private _stepByStepStore: StepByStepStore) {}

  public getJobRate(weapon: string, job: string): number {
    const level = Util.getLevel(weapon);
    const achievements = this._stepByStepStore.relations
      .filter((relation) => relation.classJobCategory.Name == job && relation.items[0]?.LevelEquip == level)
      .flatMap((relation) => relation.achievements.map((achievement) => achievement.achievement.id));
    if (this._localStorageStore.selectedCharacter.collect) {
      const completeAchievements = this._localStorageStore.selectedCharacter.collect.achievements
        .filter((achievement) => achievements.includes(achievement.id))
        .map((achievement) => achievement.id);
      return completeAchievements.length / achievements.length;
    } else if (this._localStorageStore.selectedCharacter.data?.Achievements) {
      const completeAchievements = this._localStorageStore.selectedCharacter.data.Achievements.List.filter(
        (achievement) => achievements.includes(achievement.ID)
      ).map((achievement) => achievement.ID);
      return completeAchievements.length / achievements.length;
    } else {
      return 0;
    }
  }

  public getWeaponRate(weapon: string): number {
    return (
      Util.getJobs(weapon).reduce((total, job) => this.getJobRate(weapon, job) + total, 0) / Util.getJobs(weapon).length
    );
  }

  public getChartCssText(per: number): string {
    const angle = Math.trunc(360 * per);
    return angle == 0
      ? 'conic-gradient(var(--surface-700) 0deg 360deg)'
      : `conic-gradient(var(--orange-400) 0deg ${angle}deg, var(--surface-700) ${angle}deg 360deg)`;
  }
}
