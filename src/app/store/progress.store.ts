import { Injectable } from '@angular/core';
import { LocalstorageStore } from './local-storage.store';
import { StepByStepStore } from '../component/step-by-step/step-by-step.store';
import { Util } from '../util/util';

@Injectable()
export class ProgressStore {
  constructor(private _localStorageStore: LocalstorageStore, private _stepByStepStore: StepByStepStore) {}

  public getJobRate(weapon: string, job: string): number {
    if (!this._localStorageStore.selectedCharacter.data?.Achievements) return 0;

    const level = Util.getLevel(weapon);
    const achievements = this._stepByStepStore.relations
      .filter((relation) => relation.classJobCategory.Name == job && relation.items[0]?.LevelEquip == level)
      .flatMap((relation) => relation.achievements.map((achievement) => achievement.achievement.id));

    const completeAchievements = this._localStorageStore.selectedCharacter.data.Achievements.List.filter(
      (achievement) => achievements.includes(achievement.ID)
    ).map((achievement) => achievement.ID);

    return completeAchievements.length / achievements.length;
  }

  public getWeaponRate(weapon: string): number {
    if (!this._localStorageStore.selectedCharacter.data?.Achievements) return 0;
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
