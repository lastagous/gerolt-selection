import { Component, Input } from '@angular/core';
import { StepByStepStore } from './step-by-step.store';
import { Relation } from 'src/types/json-index';

@Component({
  selector: 'app-step-by-step',
  templateUrl: './step-by-step.component.html',
  styleUrls: ['./step-by-step.component.less'],
})
export class StepByStepComponent {
  constructor(private _stepByStepStore: StepByStepStore) {}

  public get weapons(): string[] {
    return this._stepByStepStore.weapons;
  }

  public get jobs(): string[] {
    return this._stepByStepStore.jobs;
  }

  public get steps(): Relation[] {
    return this._stepByStepStore.steps;
  }

  public onWeaponClick(weapon: string): void {
    this._stepByStepStore.selectedWeapon = weapon;
  }

  public onJobClick(job: string): void {
    this._stepByStepStore.selectedJob = job;
  }

  public getJobIcon(jobName: string): string {
    return `assets/icon/job/${jobName}.png`;
  }

  public getIcon(iconPath: string): string {
    return `https://xivapi.com${iconPath}`;
  }
}
