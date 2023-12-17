import { Component, Input } from '@angular/core';
import { GItem, ItemCurrency2, Listing2, Quest, QuestPartial } from 'src/types/garlandtools';
import { StepByStepStore } from '../../step-by-step/step-by-step.store';
import { TreeNode } from 'primeng/api';
import { Relation } from 'src/types/local';
import questsJson from '../../../../assets/data/garlandtools/quests.json';
import itemsJson from '../../../../assets/data/garlandtools/items.json';

export class TreeNodeContent {
  id: number;
  item: GItem;
  name: string;
  urlType: string;
  iconUrl: string;
  tooltipUrl: string;
  amount: number;
}

@Component({
  selector: 'app-append-base',
  templateUrl: './append-base.component.html',
  styleUrls: ['./append-base.component.less'],
})
export class AppendBaseComponent {
  private readonly tooltipBaseUrl = 'https://jp.finalfantasyxiv.com/lodestone/playguide/db/';

  @Input()
  public index = 0;

  @Input()
  public step = {} as Relation;

  @Input()
  public steps = {} as Relation[];

  // quest
  // [questid, [amount]]
  // item
  // [[itemid], [amount]]
  private _useItems = [] as any[];
  private _treeNodeMap = new Map<number, TreeNode[]>();

  constructor(protected _stepByStepStore: StepByStepStore) {}

  public get itemUrlType(): string {
    return 'item';
  }

  public get questUrlType(): string {
    return 'quest';
  }

  public get npcUrlType(): string {
    return 'npc';
  }

  public get instanceUrlType(): string {
    return 'duty';
  }

  public get useItems(): any[] {
    return this._useItems;
  }

  public set useItems(value: any[]) {
    this._useItems = value;
  }

  public getTreeNodes(index: number): TreeNode[] {
    const treeNodes = this._treeNodeMap.get(index);
    // console.log(treeNodes);
    return treeNodes ? treeNodes : ([] as TreeNode[]);
  }

  public getTooltip(id: number, urlType: string): string {
    const tooltipId = this._stepByStepStore.tooltips.find(
      (tooltip) => tooltip.id == id && tooltip.urlType == urlType
    )?.tooltipId;
    return `${this.tooltipBaseUrl}${urlType}/${tooltipId ? tooltipId : ''}${tooltipId ? '/' : ''}`;
  }

  public getPartial(id: number, urlType: string, partials: QuestPartial[]): QuestPartial {
    const result = partials.find((partial) => partial.id == String(id) && partial.type == urlType);
    return result ? result : ({} as QuestPartial);
  }

  public getInstanceName(id: number): string {
    const findInstance = this._stepByStepStore.instances.find((instance) => instance.instance.id == id);
    return findInstance ? findInstance.instance.name : '';
  }

  public getItemName(id: number): string {
    const findItem = this._stepByStepStore.items.find((item) => item.ID == id);
    return findItem ? findItem.Name_ja : '';
  }

  protected createTreeNodes(): void {
    this._useItems.forEach((useItem, index) => {
      const treeNodes: TreeNode[] = [];
      (useItem as any[]).forEach((content) => {
        const id = content[0];
        if (Array.isArray(id)) {
          treeNodes.push(this.createTreeNodeFromItem(this.createListing(id, content[1])));
        } else {
          const quest = this.getQuest(id);
          if (quest) {
            treeNodes.push(this.createTreeNodeFromQuest(quest, content[1]));
          }
        }
      });
      this._treeNodeMap.set(index, treeNodes);
    });
  }

  private createTreeNodeFromQuest(quest: Quest, amounts: number[]): TreeNode {
    const children: TreeNode[] = [];
    quest.quest.usedItems.forEach((useItem, index) => {
      const node = this.createTreeNodeFromItem(this.createListing([useItem], [amounts[index]]));
      if (!children.find((child) => child.data.datas[0].id === node.data.datas[0].id)) {
        children.push(node);
      }
    });
    const tooltipUrl = this.getTooltip(quest.quest.id, this.questUrlType);
    return {
      label: quest.quest.name,
      data: {
        datas: [
          {
            quest: quest,
            name: quest.quest.name,
            urlType: this.questUrlType,
            iconUrl: `https://www.garlandtools.org/files/icons/event/${quest.quest.eventIcon}.png`,
            tooltipUrl: `${this.tooltipBaseUrl}${this.questUrlType}/` == tooltipUrl ? null : tooltipUrl,
          },
        ],
      },
      expanded: true,
      children: children,
    } as TreeNode;
  }

  private createTreeNodeFromItem(listing: Listing2[]): TreeNode {
    const itemDatas: TreeNodeContent[] = [];
    listing.forEach((list) => {
      list.currency.forEach((c) => {
        const getItem = this.getItem(Number(c.id));
        if (getItem) {
          const tooltipUrl = this.getTooltip(getItem.item.id, this.itemUrlType);
          itemDatas.push({
            id: getItem.item.id,
            item: getItem,
            name: getItem.item.name,
            urlType: this.itemUrlType,
            iconUrl: `https://www.garlandtools.org/files/icons/item/${getItem.item.icon}.png`,
            tooltipUrl: `${this.tooltipBaseUrl}${this.itemUrlType}/` == tooltipUrl ? null : tooltipUrl,
            amount: c.amount,
          } as TreeNodeContent);
        }
      });
    });
    const children: TreeNode[] = [];
    itemDatas.forEach((itemData) => {
      itemData.item.item.tradeShops?.forEach((tradeshop) => {
        const node = this.createTreeNodeFromItem(tradeshop.listings);
        if (!children.find((child) => child.data.datas[0]?.id === node.data.datas[0]?.id)) {
          children.push(node);
        }
      });
    });

    const parent = this.getItem(Number(listing[0]?.item[0]?.id));
    const parentTooltipUrl = parent ? this.getTooltip(parent.item.id, this.itemUrlType) : null;
    return {
      data: {
        datas: itemDatas,
        urlType: this.itemUrlType,
        parent: parent,
        parentName: parent ? parent.item.name : null,
        parentIconUrl: parent ? `https://www.garlandtools.org/files/icons/item/${parent.item.icon}.png` : null,
        parentTooltipUrl: `${this.tooltipBaseUrl}${this.itemUrlType}/` == parentTooltipUrl ? null : parentTooltipUrl,
        parentAmount: listing[0]?.item[0]?.amount,
      },
      expanded: true,
      children: children,
    } as TreeNode;
  }

  private createListing(ids: number[], amouonts: number[]): Listing2[] {
    return [
      {
        item: [],
        currency: ids.map((id, index) => {
          return {
            id: String(id),
            amount: amouonts[index],
          } as ItemCurrency2;
        }),
      },
    ] as Listing2[];
  }

  private getQuest(id: number): Quest | undefined {
    return (questsJson as Quest[]).find((quest) => quest.quest.id === id);
  }

  private getItem(id: number): GItem | undefined {
    return (itemsJson as GItem[]).find((item) => item.item.id === id);
  }

  public log(e: any) {
    console.log(e);
  }
}
