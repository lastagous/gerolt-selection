import { Component, Input } from '@angular/core';
import { index } from 'cheerio/lib/api/traversing';
import { QuestPartial, Relation } from 'src/types/json-index';
import { StepByStepStore } from '../../step-by-step/step-by-step.store';

@Component({
  selector: 'app-zodiac',
  templateUrl: './zodiac.component.html',
  styleUrls: ['./zodiac.component.less'],
})
export class ZodiacComponent {
  @Input()
  public index = 0;

  @Input()
  public step = {} as Relation;

  @Input()
  public steps = {} as Relation[];

  constructor(private _stepByStepStore: StepByStepStore) {}

  public get itemUrlType(): string {
    return 'item';
  }

  public get questUrlType(): string {
    return 'quest';
  }

  public getTooltip(id: number, urlType: string): string {
    const baseUrl = `https://jp.finalfantasyxiv.com/lodestone/playguide/db/${urlType}/`;
    const tooltipId = this._stepByStepStore.tooltips.find((tooltip) => tooltip.id == id)?.tooltipId;
    return `${baseUrl}${tooltipId ? tooltipId : ''}${tooltipId ? '/' : ''}`;
  }

  public getPartial(id: number, urlType: string, partials: QuestPartial[]): QuestPartial {
    const result = partials.find((partial) => partial.id == String(id) && partial.type == urlType);
    return result ? result : ({} as QuestPartial);
  }

  public getMateria(job: string) {
    switch (job) {
      case 'PLD':
        return '剛柔のマテリダ';
      case 'WAR':
        return '剛柔のマテリダ';
      case 'WHM':
        return '詠唱のマテリダ';
      case 'SCH':
        return '詠唱のマテリダ';
      case 'MNK':
        return '武略のマテリダ';
      case 'DRG':
        return '武略のマテリダ';
      case 'NIN':
        return '天眼のマテリダ';
      case 'BRD':
        return '天眼のマテリダ';
      case 'BLM':
        return '雄略のマテリダ';
      case 'SMN':
        return '雄略のマテリダ';
      default:
        return '';
    }
  }

  public get atmas(): any[] {
    return [
      {
        name: '処女のアートマ',
        map: '中央森林',
      },
      {
        name: '人馬のアートマ',
        map: '北部森林',
      },
      {
        name: '磨羯のアートマ',
        map: '東部森林',
      },
      {
        name: '天蠍のアートマ',
        map: '南ザナラーン',
      },
      {
        name: '金牛のアートマ',
        map: '東ザナラーン',
      },
      {
        name: '天秤のアートマ',
        map: '中央ザナラーン',
      },
      {
        name: '双子のアートマ',
        map: '西ザナラーン',
      },
      {
        name: '双魚のアートマ',
        map: '低地ラノシア',
      },
      {
        name: '白羊のアートマ',
        map: '中央ラノシア',
      },
      {
        name: '宝瓶のアートマ',
        map: '高地ラノシア',
      },
      {
        name: '獅子のアートマ',
        map: '外地ラノシア',
      },
      {
        name: '巨蟹のアートマ',
        map: '西ラノシア',
      },
    ];
  }

  public log(d: any) {
    console.log(d);
  }
}
