import { Component } from '@angular/core';
import { Roll_JP } from 'src/app/enum/roll';
import { JobModel } from 'src/app/model/job';
import { StorageCharacterModel } from 'src/app/model/localstorage.model';
import { LocalstorageStore } from 'src/app/store/local-storage.store';
import { ProgressStore } from 'src/app/store/progress.store';
import { StepByStepStore } from 'src/app/store/step-by-step.store';
import { JobUtil } from 'src/app/util/job.util';

@Component({
  selector: 'app-relic-progress-list',
  templateUrl: './relic-progress-list.component.html',
  styleUrls: ['./relic-progress-list.component.less'],
})
export class RelicProgressListComponent {
  constructor(
    private _stepByStepStore: StepByStepStore,
    private _progressStore: ProgressStore,
    private _localStorageStore: LocalstorageStore
  ) {}

  public get selectedCharacter(): StorageCharacterModel {
    return this._localStorageStore.selectedCharacter;
  }

  public get tankList(): JobModel[] {
    return JobUtil.jobList.filter((obj) => Roll_JP.TANK === obj.roll);
  }

  public get healerList(): JobModel[] {
    return JobUtil.jobList.filter((obj) => Roll_JP.HEALER === obj.roll);
  }

  public get meleeList(): JobModel[] {
    return JobUtil.jobList.filter((obj) => Roll_JP.MELEE === obj.roll);
  }

  public get rangeList(): JobModel[] {
    return JobUtil.jobList.filter((obj) => Roll_JP.PHYSICAL_RANGE === obj.roll);
  }

  public get casterList(): JobModel[] {
    return JobUtil.jobList.filter((obj) => Roll_JP.MAGICAL_RANGE === obj.roll);
  }

  public getJobRate(job: string): number {
    return Math.floor(
      this._progressStore.getJobRate(
        this._stepByStepStore.selectedWeapon.key,
        job,
        this._localStorageStore.selectedCharacter
      ) * 100
    );
  }
}
