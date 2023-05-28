import { Injectable } from '@angular/core';
import { XivapiStore } from 'src/app/store/xivapi.store';
import { XivapiItemModel } from '../model/xivapi-item.model';

@Injectable()
export class SearchJsonStore {
  private _items: XivapiItemModel[] = [];

  constructor(private _xivapiStore: XivapiStore) {
    // Get data with the following method when updated to a new version
    // this.searchWeponAchievements();
    // this.searchWeponItemsForPatch2To5();
    // this.searchWeponItemsForPatch6();
  }

  private searchWeponAchievements(): void {
    const names = [
      '古の武器',
      'ゾディアックウェポン',
      'アニマウェポン',
      'エウレカウェポン',
      'レジスタンス・ウェポン',
      'マンダヴィルウェポン',
    ];
    names.forEach((name) => {
      this._xivapiStore
        .search({
          indexes: 'achievement',
          columns:
            'AchievementCategory.Name_ja,Description_ja,ID,Icon,IconHD,Name,Name_de,Name_en,Name_fr,Name_ja',
          body: {
            query: {
              bool: {
                must: [
                  {
                    wildcard: {
                      'AchievementCategory.AchievementKind.Name_ja': 'アイテム',
                    },
                  },
                  {
                    wildcard: {
                      'AchievementCategory.Name_ja': `${name}`,
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
        .subscribe(async (searchAchievements) => {
          console.log(searchAchievements);
          for (let result of (searchAchievements as any).Results) {
            await this.sleep(500);
            await this.searchWeponItemsFromAchievementName(result.Name_ja);
          }
          console.log(this._items);
        });
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
            'ClassJobCategory.Name,ClassJobCategory.Name_de,ClassJobCategory.Name_en,ClassJobCategory.Name_fr,ClassJobCategory.Name_ja,ID,Icon,IconID,LevelEquip,LevelItem,Name,Name_de,Name_en,Name_fr,Name_ja,Patch,Url,UrlType',
          body: {
            query: {
              bool: {
                must: [
                  {
                    wildcard: {
                      Name_ja: `*${itemName}*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `[*]`,
                    },
                  },
                ],
                must_not: {
                  wildcard: {
                    Name_ja: `*レプリカ*`,
                  },
                },
              },
            },
            from: 0,
            size: 700,
            sort: [],
          },
        })
        .subscribe((searchItems) => {
          this._items = this._items.concat(
            (searchItems as any).Results as XivapiItemModel[]
          );
          resolve();
        });
    });
  }

  private async searchWeponItemsForPatch2To5(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._xivapiStore
        .search({
          indexes: 'item',
          columns:
            'ClassJobCategory.Name,ClassJobCategory.Name_de,ClassJobCategory.Name_en,ClassJobCategory.Name_fr,ClassJobCategory.Name_ja,Description_ja,ID,Icon,IconID,LevelEquip,LevelItem,Name,Name_de,Name_en,Name_fr,Name_ja,Patch,Url,UrlType',
          body: {
            query: {
              bool: {
                must: [
                  {
                    wildcard: {
                      Description_ja: `[*]`,
                    },
                  },
                ],
                must_not: [
                  {
                    wildcard: {
                      Name_ja: `*レプリカ*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*防具*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*模造品*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*1回目の装着*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*装備不可*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*友好部族クエスト*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*スカイスチールツール*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*モーエンツール*`,
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
        .subscribe((searchItems) => {
          console.log(searchItems);
          this._items = this._items.concat(
            (searchItems as any).Results as XivapiItemModel[]
          );
          resolve();
        });
    });
  }

  private async searchWeponItemsForPatch6(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._xivapiStore
        .search({
          indexes: 'item',
          columns:
            'ClassJobCategory.Name,ClassJobCategory.Name_de,ClassJobCategory.Name_en,ClassJobCategory.Name_fr,ClassJobCategory.Name_ja,Description_ja,ID,Icon,IconID,LevelEquip,LevelItem,Name,Name_de,Name_en,Name_fr,Name_ja,Patch,Url,UrlType',
          body: {
            query: {
              bool: {
                must: [
                  {
                    wildcard: {
                      Name_ja: `*マンダヴィル・*`,
                    },
                  },
                ],
                must_not: [
                  {
                    wildcard: {
                      Name_ja: `*レプリカ*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*防具*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*模造品*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*1回目の装着*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*装備不可*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*友好部族クエスト*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*スカイスチールツール*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*モーエンツール*`,
                    },
                  },
                  {
                    wildcard: {
                      Description_ja: `*マンダヴィル*`,
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
        .subscribe((searchItems) => {
          console.log(searchItems);
          this._items = this._items.concat(
            (searchItems as any).Results as XivapiItemModel[]
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
