import { Component } from '@angular/core';
import { ProgressPanelStore } from '../../store/progress-panel.store';
import { MenuItem } from 'primeng/api';
import {
  ProgressPanelMenuItem,
  UpgradeStepModel,
} from 'src/app/model/progress-panel.model';

@Component({
  selector: 'app-progress-panel',
  templateUrl: './progress-panel.component.html',
  styleUrls: ['./progress-panel.component.less'],
})
export class ProgressPanelComponent {
  constructor(private _progressPanelStore: ProgressPanelStore) {}

  public get menuItems(): MenuItem[] {
    return this._progressPanelStore.menuItems;
  }

  public get activeItem(): ProgressPanelMenuItem {
    return this._progressPanelStore.activeItem;
  }

  public set activeItem(value: ProgressPanelMenuItem) {
    this._progressPanelStore.activeItem = value;
  }

  public getJobIcon(jobName: string): string {
    return `assets/icon/job/${jobName}.png`;
  }

  public getIcon(iconPath: string): string {
    return `https://xivapi.com${iconPath}`;
  }

  public getStepName(
    sources: UpgradeStepModel[],
    target: UpgradeStepModel
  ): string {
    return `STEP. ${sources.indexOf(target) + 1}`;
  }

  public isAchievementCompleted(id: number): boolean {
    return this._progressPanelStore.isAchievementCompleted(id);
  }
}
