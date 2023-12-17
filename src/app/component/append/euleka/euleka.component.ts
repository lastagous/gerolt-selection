import { Component, OnInit } from '@angular/core';
import { AppendBaseComponent } from '../append-base/append-base.component';

@Component({
  selector: 'app-euleka',
  templateUrl: './euleka.component.html',
  styleUrls: ['../append-base/append-base.component.less'],
})
export class EulekaComponent extends AppendBaseComponent implements OnInit {
  ngOnInit(): void {
    this.useItems = [
      [[[21801], [100]]],
      [[[21801], [400]]],
      [[[21801], [800]]],
      [[[21802], [3]]],
      [[[23309], [5]]],
      [
        [
          [23309, 22976],
          [10, 500],
        ],
      ],
      [
        [
          [23309, 22976],
          [16, 5],
        ],
      ],
      [[[24124], [150]]],
      [[[24124], [200]]],
      [
        [
          [24124, 24123],
          [300, 5],
        ],
      ],
      [[[24807], [50]]],
      [[[24807], [100]]],
      [[[24807], [100]]],
      [
        [
          [24807, 24806],
          [100, 5],
        ],
      ],
      [[[24808], [100]]],
    ];
    this.createTreeNodes();
  }
}
