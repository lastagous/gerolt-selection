import { Component } from '@angular/core';
import { StepByStepStore } from './step-by-step.store';
import { ProgressStore } from 'src/app/store/progress.store';
import { LocalstorageStore } from 'src/app/store/local-storage.store';
import { Relation } from 'src/types/local';

@Component({
  selector: 'app-step-by-step',
  templateUrl: './step-by-step.component.html',
  styleUrls: ['./step-by-step.component.less'],
})
export class StepByStepComponent {
  constructor(
    private _stepByStepStore: StepByStepStore,
    private _progressStore: ProgressStore,
    private _localStorageStore: LocalstorageStore
  ) {}

  public get weapons(): string[] {
    return this._stepByStepStore.weapons;
  }

  public get jobs(): string[] {
    return this._stepByStepStore.jobs;
  }

  public get steps(): Relation[] {
    return this._stepByStepStore.steps;
  }

  public get progressStore(): ProgressStore {
    return this._progressStore;
  }

  public get itemUrlType(): string {
    return 'item';
  }

  public get questUrlType(): string {
    return 'quest';
  }

  public get eventUrlType(): string {
    return 'event';
  }

  public get achievementUrlType(): string {
    return 'achievement';
  }

  public get imageSrc(): string {
    return `../../../assets/img/${this._stepByStepStore.image}.png`;
  }

  public onWeaponClick(weapon: string): void {
    this._stepByStepStore.selectedWeapon = weapon;
  }

  public onJobClick(job: string): void {
    this._stepByStepStore.selectedJob = job;
  }

  public getWeaponIcon(weaponName: string): string {
    return `assets/icon/weapon/${weaponName}.png`;
  }

  public getJobIcon(jobName: string): string {
    return `assets/icon/job/${jobName}.png`;
  }

  public getXviapiIcon(iconPath: string): string {
    return `https://xivapi.com${iconPath}`;
  }

  public getGarlandtoolsIcon(icon: number, type: string): string {
    return `https://garlandtools.org/files/icons/${type}/${icon}.png`;
  }

  public getTooltip(id: number, urlType: string): string {
    const baseUrl = `https://jp.finalfantasyxiv.com/lodestone/playguide/db/${urlType}/`;
    const tooltipId = this._stepByStepStore.tooltips.find((tooltip) => tooltip.id == id)?.tooltipId;
    return `${baseUrl}${tooltipId ? tooltipId : ''}${tooltipId ? '/' : ''}`;
  }

  public isAchievementCompleted(id: number): boolean {
    return this._stepByStepStore.isAchievementCompleted(id);
  }

  public isWeaponSelected(weapon: string): boolean {
    return this._stepByStepStore.selectedWeapon === weapon;
  }

  public isJobSelected(job: string): boolean {
    return this._stepByStepStore.selectedJob === job;
  }

  public getWeaponRateCssText(weapon: string): string {
    return this._progressStore.getChartCssText(
      this._progressStore.getWeaponRate(weapon, this._localStorageStore.selectedCharacter)
    );
  }

  public getJobRateCssText(job: string): string {
    return this._progressStore.getChartCssText(
      this._progressStore.getJobRate(
        this._stepByStepStore.selectedWeapon,
        job,
        this._localStorageStore.selectedCharacter
      )
    );
  }
}
