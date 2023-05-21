import { Component } from '@angular/core';
import { ProgressPanelStore } from './progress-panel.store';
import {
  JobAchievementViewModel,
  TabItem,
} from 'src/app/model/progress-panel.model';
import { MenuItem } from 'primeng/api';
import { KeyValue } from '@angular/common';

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

  public get activeItem(): MenuItem {
    return this._progressPanelStore.activeItem;
  }

  public set activeItem(value: MenuItem) {
    this._progressPanelStore.activeItem = value;
  }

  public get tabItems(): TabItem[] {
    return this._progressPanelStore.tabItems;
  }

  public get selectedTabitem(): TabItem {
    return this._progressPanelStore.selectedTabItem;
  }

  public activeItemChange(item: MenuItem): void {
    const target = this._progressPanelStore.tabItems.find(
      (tabItem) => tabItem.label === item.label
    );
    if (target) {
      this._progressPanelStore.selectedTabItem = target;
    }
  }

  public getJobImageSrc(jobName: string): string {
    return `/assets/icon/job/${jobName}.png`;
  }

  public getIcon(iconPath: string): string {
    return `https://xivapi.com${iconPath}`;
  }

  public getStepName(
    sources: JobAchievementViewModel[],
    target: JobAchievementViewModel
  ): string {
    return `STEP. ${sources.indexOf(target) + 1}`;
  }

  public getViewMapOrder(
    a: KeyValue<string, JobAchievementViewModel[]>,
    b: KeyValue<string, JobAchievementViewModel[]>
  ): number {
    const jobSort: string[] = [
      'PLD',
      'WAR',
      'DRK',
      'GNB',
      'WHM',
      'SCH',
      'AST',
      'SGE',
      'MNK',
      'DRG',
      'NIN',
      'SAM',
      'RPR',
      'BRD',
      'MCH',
      'DNC',
      'BLM',
      'SMN',
      'RDM',
    ];
    return jobSort?.indexOf(a.key) - jobSort?.indexOf(b.key);
  }
}
