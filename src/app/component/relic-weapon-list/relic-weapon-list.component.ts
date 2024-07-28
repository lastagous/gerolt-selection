import { Component } from '@angular/core';
import { LocalstorageStore } from 'src/app/store/local-storage.store';
import { ProgressStore } from 'src/app/store/progress.store';
import { StepByStepStore, WeaponModel } from 'src/app/store/step-by-step.store';

@Component({
  selector: 'app-relic-weapon-list',
  templateUrl: './relic-weapon-list.component.html',
  styleUrls: ['./relic-weapon-list.component.less'],
})
export class RelicWeaponListComponent {
  constructor(
    private _stepByStepStore: StepByStepStore,
    private _progressStore: ProgressStore,
    private _localStorageStore: LocalstorageStore
  ) {}

  public get weapons(): WeaponModel[] {
    return this._stepByStepStore.weapons;
  }

  public get selectedWeapon(): WeaponModel {
    return this._stepByStepStore.selectedWeapon;
  }

  public set selectedWeapon(value: WeaponModel) {
    this._stepByStepStore.selectedWeapon = value;
  }

  public getWeaponIcon(weaponName: string): string {
    return `assets/icon/weapon/${weaponName}.png`;
  }
}
