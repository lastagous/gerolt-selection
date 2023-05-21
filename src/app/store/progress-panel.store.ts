import { Injectable } from '@angular/core';
import {
  AchievementModel,
  ItemAchievementPareModel,
  ItemModel,
  JobAchievementViewModel,
  TabItem,
} from 'src/app/model/progress-panel.model';
import { XivapiStore } from 'src/app/store/xivapi.store';
import _zwAchievementsJson from '../../assets/data/zw-achievements.json';
import _awAchievementsJson from '../../assets/data/aw-achievements.json';
import _ewAchievementsJson from '../../assets/data/ew-achievements.json';
import _rwAchievementsJson from '../../assets/data/rw-achievements.json';
import _mwAchievementsJson from '../../assets/data/mw-achievements.json';
import _itemsJson from '../../assets/data/items.json';
import { MenuItem } from 'primeng/api';

@Injectable()
export class ProgressPanelStore {
  private _zwAchievements: AchievementModel[] = [];
  private _awAchievements: AchievementModel[] = [];
  private _ewAchievements: AchievementModel[] = [];
  private _rwAchievements: AchievementModel[] = [];
  private _mwAchievements: AchievementModel[] = [];
  private _tabItems: TabItem[] = [];
  private _selectedTabItem: TabItem;
  private _items: ItemModel[] = [];
  private _menuItems: MenuItem[] = [];
  private _activeItem: MenuItem;
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

  constructor(private _xivapiStore: XivapiStore) {
    // Get data with the following method when updated to a new version
    // this.searchWeponAchievements();

    this._zwAchievements = _zwAchievementsJson as AchievementModel[];
    this._awAchievements = _awAchievementsJson as AchievementModel[];
    this._ewAchievements = _ewAchievementsJson as AchievementModel[];
    this._rwAchievements = _rwAchievementsJson as AchievementModel[];
    this._mwAchievements = _mwAchievementsJson as AchievementModel[];
    this._items = _itemsJson as ItemModel[];
    this.createTabIndex();
    this.createMenuItems();
    console.log(this._tabItems);
  }

  public get tabItems(): TabItem[] {
    return this._tabItems;
  }

  public get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  public get activeItem(): MenuItem {
    return this._activeItem;
  }

  public set activeItem(value: MenuItem) {
    this._activeItem = value;
  }

  public get selectedTabItem(): TabItem {
    return this._selectedTabItem;
  }

  public set selectedTabItem(value: TabItem) {
    this._selectedTabItem = value;
  }

  public isAchievementCompleted(id: number): boolean {
    return Boolean(
      this._xivapiStore.selectedCharacter?.Achievements?.List.find(
        (achievement) => achievement.ID === id
      )
    );
  }

  private createTabIndex(): void {
    this._tabItems = [
      {
        label: 'ZW',
        title: 'ゾディアックウェポン',
        achievements: this._zwAchievements,
        viewList: [],
      },
      {
        label: 'AW',
        title: 'アニマウェポン',
        achievements: this._awAchievements,
        viewList: [],
      },
      {
        label: 'EW',
        title: 'エウレカウェポン',
        achievements: this._ewAchievements,
        viewList: [],
      },
      {
        label: 'RW',
        title: 'レジスタンス・ウェポン',
        achievements: this._rwAchievements,
        viewList: [],
      },
      {
        label: 'MW',
        title: 'マンダヴィルウェポン',
        achievements: this._mwAchievements,
        viewList: [],
      },
    ] as TabItem[];
    this.createViewMap();
  }

  private createViewMap(): void {
    this._tabItems.forEach((tab) => {
      tab.achievements.forEach((achievement) => {
        let items: ItemModel[] = [];
        if (achievement.Name_ja.includes('＆')) {
          const match = achievement.Name_ja.match(
            new RegExp(/：([^＆]+)＆([^＆]+)/)
          );
          if (match) {
            const item1 = this._items.find(
              (i) => i.Name_ja === match[1].trim()
            );
            const item2 = this._items.find(
              (i) => i.Name_ja === match[2].trim()
            );

            if (item1 && item2) {
              items = [item1, item2];
            }
          }
        } else {
          const match = achievement.Name_ja.match(new RegExp(/：([^：]+)/));
          if (match) {
            const item = this._items.find((i) => i.Name_ja === match[1].trim());
            if (item) {
              items = [item];
            }
          }
        }

        if (items.length) {
          const itemAchievementPareModel = {
            Version: achievement.GamePatch.Version,
            Achivement: achievement,
            Items: items,
          } as ItemAchievementPareModel;
          const jobAchievementViewModel = tab.viewList.find(
            (viewModel) =>
              viewModel.JobNameEn === items[0].ClassJobCategory.Name_en
          );

          if (jobAchievementViewModel) {
            jobAchievementViewModel.itemAchievementPares.push(
              itemAchievementPareModel
            );
          } else {
            tab.viewList.push({
              JobNameEn: items[0].ClassJobCategory.Name_en,
              JobNameJa: items[0].ClassJobCategory.Name_ja,
              itemAchievementPares: [itemAchievementPareModel],
            });
          }
        }
      });

      tab.viewList.sort(
        (a, b) =>
          this._jobSort.indexOf(a.JobNameEn) -
          this._jobSort.indexOf(b.JobNameEn)
      );
    });
  }

  private createMenuItems(): void {
    this._tabItems.forEach((tab) => {
      this._menuItems.push({
        label: tab.label,
      } as MenuItem);
    });
    this._activeItem = this._menuItems[0];
    this._selectedTabItem = this.tabItems[0];
  }

  private searchWeponAchievements(): void {
    this._xivapiStore
      .search({
        indexes: 'achievement',
        columns:
          'AchievementCategory.Name_ja,Description_ja,GamePatch.ReleaseDate,GamePatch.Version,ID,IconHD,IconID,Name_ja',
        body: {
          query: {
            bool: {
              must: [
                {
                  wildcard: {
                    'AchievementCategory.AchievementKind.Name_ja': 'アイテム',
                  },
                },
              ],
              should: [
                { wildcard: { 'AchievementCategory.Name_ja': '古の武器' } },
                {
                  wildcard: { 'AchievementCategory.Name_ja': 'アニマウェポン' },
                },
                {
                  wildcard: {
                    'AchievementCategory.Name_ja': 'エウレカウェポン',
                  },
                },
                {
                  wildcard: {
                    'AchievementCategory.Name_ja': 'レジスタンス・ウェポン',
                  },
                },
                {
                  wildcard: {
                    'AchievementCategory.Name_ja': 'マンダヴィルウェポン',
                  },
                },
              ],
            },
          },
          from: 0,
          size: 1000,
          sort: [],
        },
      })
      .subscribe((searchAchievements) => {
        console.log(searchAchievements);
        this._zwAchievements = (
          (searchAchievements as any).Results as AchievementModel[]
        ).filter(
          (achievement) =>
            achievement.AchievementCategory.Name_ja === '古の武器'
        );
        this._awAchievements = (
          (searchAchievements as any).Results as AchievementModel[]
        ).filter(
          (achievement) =>
            achievement.AchievementCategory.Name_ja === 'アニマウェポン'
        );
        this._ewAchievements = (
          (searchAchievements as any).Results as AchievementModel[]
        ).filter(
          (achievement) =>
            achievement.AchievementCategory.Name_ja === 'エウレカウェポン'
        );
        this._rwAchievements = (
          (searchAchievements as any).Results as AchievementModel[]
        ).filter(
          (achievement) =>
            achievement.AchievementCategory.Name_ja === 'レジスタンス・ウェポン'
        );
        this._mwAchievements = (
          (searchAchievements as any).Results as AchievementModel[]
        ).filter(
          (achievement) =>
            achievement.AchievementCategory.Name_ja === 'マンダヴィルウェポン'
        );
        console.log(this._zwAchievements);
        console.log(this._awAchievements);
        console.log(this._ewAchievements);
        console.log(this._rwAchievements);
        console.log(this._mwAchievements);
        (async () => {
          for (let zwAchievement of this._zwAchievements) {
            await this.sleep(500);
            await this.searchWeponItemsFromAchievementName(
              zwAchievement.Name_ja
            );
          }
          for (let awAchievement of this._awAchievements) {
            await this.sleep(500);
            await this.searchWeponItemsFromAchievementName(
              awAchievement.Name_ja
            );
          }
          for (let ewAchievement of this._ewAchievements) {
            await this.sleep(500);
            await this.searchWeponItemsFromAchievementName(
              ewAchievement.Name_ja
            );
          }
          for (let rwAchievement of this._rwAchievements) {
            await this.sleep(500);
            await this.searchWeponItemsFromAchievementName(
              rwAchievement.Name_ja
            );
          }
          for (let mwAchievement of this._mwAchievements) {
            await this.sleep(500);
            await this.searchWeponItemsFromAchievementName(
              mwAchievement.Name_ja
            );
          }
          console.log(this._items);
        })();
      });
  }

  private async searchWeponItemsFromAchievementName(
    achievementName: string
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (achievementName.includes('＆')) {
        const match = achievementName.match(new RegExp(/：([^＆]+)＆([^＆]+)/));
        if (match) {
          await this.searchWeponItem(match[1].trim().replace('RE', ''));
          await this.searchWeponItem(match[2].trim().replace('RE', ''));
        } else {
          console.log(`reject achivement: ${achievementName}`);
        }
      } else {
        const match = achievementName.match(new RegExp(/：([^：]+)/));
        if (match) {
          await this.searchWeponItem(match[1].trim().replace('RE', ''));
        } else {
          console.log(`reject achivement: ${achievementName}`);
        }
      }
      resolve();
    });
  }

  private async searchWeponItem(itemName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._xivapiStore
        .search({
          indexes: 'item',
          columns:
            'ClassJobCategory.Name_ja,ClassJobCategory.Name_en,ID,IconHD,IconID,LevelItem,Name_ja',
          body: {
            query: {
              bool: {
                must: [
                  {
                    wildcard: {
                      Name_ja: `*${itemName}*`,
                    },
                  },
                ],
              },
            },
            from: 0,
            size: 3,
            sort: [],
          },
        })
        .subscribe((searchItems) => {
          this._items = this._items.concat(
            (searchItems as any).Results as ItemModel[]
          );
          resolve();
        });
    });
  }

  private sleep(time: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}
