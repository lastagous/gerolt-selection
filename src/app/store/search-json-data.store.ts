import { Injectable } from '@angular/core';
import { XivapiStore } from 'src/app/store/xivapi.store';
import { XivapiItemModel } from '../model/xivapi-item.model';
import relicItemQueryBaseJson from '../../assets/elasticsearch/xivapi-relic-item.json';
import relicAchievementQueryBaseJson from '../../assets/elasticsearch/xivapi-relic-achievement.json';
import { QueryModel } from '../model/xviapi-post.model';

@Injectable()
export class SearchJsonStore {
  private _items: XivapiItemModel[] = [];
  private _relicItemQueryBase: QueryModel;
  private _relicAchievementQueryBase: QueryModel;

  constructor(private _xivapiStore: XivapiStore) {
    this._relicItemQueryBase = relicItemQueryBaseJson as QueryModel;
    this._relicAchievementQueryBase =
      relicAchievementQueryBaseJson as QueryModel;
    // Get data with the following method when updated to a new version
    // this.searchWeponAchievements();
    this.searchWeponItemsForPatch2To5();
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
      const query = this._relicAchievementQueryBase;
      query.body.query.bool.must.push({
        wildcard: {
          'AchievementCategory.Name_ja': `${name}`,
        },
      });
      this._xivapiStore.search(query).subscribe(async (searchAchievements) => {
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
    const query = this._relicItemQueryBase;
    query.body.query.bool.must.push({
      wildcard: {
        Name_ja: `*${itemName}*`,
      },
    });
    query.body.query.bool.must.push({
      wildcard: {
        Description_ja: `[*]`,
      },
    });
    return new Promise((resolve, reject) => {
      this._xivapiStore.search(query).subscribe((searchItems) => {
        this._items = this._items.concat(
          (searchItems as any).Results as XivapiItemModel[]
        );
        resolve();
      });
    });
  }

  private async searchWeponItemsForPatch2To5(): Promise<void> {
    const query = this._relicItemQueryBase;
    query.body.query.bool.must.push({
      wildcard: {
        Description_ja: `[*]`,
      },
    });
    return new Promise((resolve, reject) => {
      this._xivapiStore.search(query).subscribe((searchItems) => {
        console.log(searchItems);
        this._items = this._items.concat(
          (searchItems as any).Results as XivapiItemModel[]
        );
        resolve();
      });
    });
  }

  private async searchWeponItemsForPatch6(): Promise<void> {
    const query = this._relicItemQueryBase;
    query.body.query.bool.must.push({
      wildcard: {
        Name_ja: `*マンダヴィル・*`,
      },
    });
    return new Promise((resolve, reject) => {
      this._xivapiStore.search(query).subscribe((searchItems) => {
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
