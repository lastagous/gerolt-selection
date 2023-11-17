import { Injectable } from '@angular/core';
import _achievementsJson from '../../assets/data/achievements.json';
import _itemsJson from '../../assets/data/items.json';
import { MenuItem } from 'primeng/api';
import { XivapiCharacterModel } from '../model/xivapi-character.model';
import { LocalstorageStore } from './local-storage.store';
import { XivapiItemModel } from '../model/xivapi-item.model';
import { XviapiAchievementModel } from '../model/xivapi-achievement.model';
import {
  ProgressJobModel,
  ProgressPanelMenuItem,
  UpgradeStepModel,
} from '../model/progress-panel.model';

@Injectable()
export class ProgressPanelStore {
  private _achievements: XviapiAchievementModel[] = [];
  private _items: XivapiItemModel[] = [];
  private _menuItems: ProgressPanelMenuItem[] = [];
  private _activeItem: ProgressPanelMenuItem;
  private _jobSort: string[] = [
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
  private _patchs = [
    { weapon: 'ZW', version: 2, levelEquip: 50 },
    { weapon: 'AW', version: 3, levelEquip: 60 },
    { weapon: 'EW', version: 4, levelEquip: 70 },
    { weapon: 'RW', version: 5, levelEquip: 80 },
    { weapon: 'MW', version: 6, levelEquip: 90 },
  ];

  constructor(private _localStorageStore: LocalstorageStore) {
    this._achievements = _achievementsJson as XviapiAchievementModel[];
    this._items = _itemsJson as XivapiItemModel[];
    this.createManuItem();
    console.log(this._menuItems);
  }

  public get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  public get activeItem(): ProgressPanelMenuItem {
    return this._activeItem;
  }

  public set activeItem(value: ProgressPanelMenuItem) {
    this._activeItem = value;
  }

  public isAchievementCompleted(id: number): boolean {
    return Boolean(
      this._localStorageStore.selectedCharacter?.data?.Achievements?.List.find(
        (achievement) => achievement.ID === id
      )
    );
  }

  public getCompleteRate(
    label: string,
    character: XivapiCharacterModel
  ): number {
    const achievements = this._menuItems
      .find((MenuItem) => MenuItem.label === label)
      ?.data?.progressJobs.flatMap((progressJob) =>
        progressJob.upgradeSteps.flatMap(
          (upgradeStep) => upgradeStep.achievement
        )
      );

    if (achievements) {
      const completed = achievements.filter((achievement) =>
        character.Achievements?.List.find((char) => char.ID === achievement.ID)
      );
      return completed.length / achievements.length;
    }
    return 0;
  }

  private createManuItem(): void {
    this._menuItems = this._patchs.map((patch) => {
      return {
        label: patch.weapon,
        data: {
          progressJobs: this._jobSort.reduce((progressJobs, jobName) => {
            const itemLevels = Array.from(
              new Set(
                this._items
                  .filter(
                    (item) =>
                      item.LevelEquip === patch.levelEquip &&
                      item.ClassJobCategory.Name_en === jobName
                  )
                  .map((weapon) => weapon.LevelItem)
              )
            );
            if (itemLevels.length) {
              progressJobs.push({
                name: jobName,
                upgradeSteps: itemLevels.map((itemLevel) => {
                  const items = this._items.filter(
                    (item) =>
                      item.LevelEquip === patch.levelEquip &&
                      item.ClassJobCategory.Name_en === jobName &&
                      item.LevelItem === itemLevel
                  );
                  return {
                    items: items,
                    achievement: this._achievements.find((achievement) =>
                      achievement.Name_ja.includes(items[0].Name_ja)
                    ),
                  } as UpgradeStepModel;
                }),
              });
            }
            return progressJobs;
          }, [] as ProgressJobModel[]),
        },
      } as ProgressPanelMenuItem;
    });
    this._activeItem = this._menuItems[0];
  }
}
