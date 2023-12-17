import { Component, OnInit } from '@angular/core';
import { AppendBaseComponent } from '../append-base/append-base.component';

@Component({
  selector: 'app-zodiac',
  templateUrl: './zodiac.component.html',
  styleUrls: ['../append-base/append-base.component.less'],
})
export class ZodiacComponent extends AppendBaseComponent implements OnInit {
  ngOnInit(): void {
    this.useItems = [
      [[[6267], [1]]],
      [[[6268], [3]]],
      [
        [[7851], [1]],
        [[7852], [1]],
        [[7853], [1]],
        [[7854], [1]],
        [[7855], [1]],
        [[7856], [1]],
        [[7857], [1]],
        [[7858], [1]],
        [[7859], [1]],
        [[7860], [1]],
        [[7861], [1]],
        [[7862], [1]],
      ],
      [],
      [
        [[7885], [3]],
        [[7883], [75]],
      ],
      [],
      [
        [65893, [1, 1, 1, 1, 1]],
        [65894, [1, 1, 1, 1, 1]],
        [65895, [1, 1, 1, 1, 1]],
        [65896, [1, 1, 1, 1, 1]],
      ],
      [],
    ];
    this.createTreeNodes();
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
}
