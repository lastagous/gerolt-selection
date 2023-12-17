import { Component, OnInit } from '@angular/core';
import { AppendBaseComponent } from '../append-base/append-base.component';

@Component({
  selector: 'app-anima',
  templateUrl: './anima.component.html',
  styleUrls: ['../append-base/append-base.component.less'],
})
export class AnimaComponent extends AppendBaseComponent implements OnInit {
  ngOnInit(): void {
    this.useItems = [
      [[this.steps[0].quests[0].quest.id, [1, 1]]],
      [],
      [[this.steps[2].quests[0].quest.id, [1, 1, 1, 1]]],
      [[this.steps[3].quests[0].quest.id, [5]]],
      [
        [[15841], [60]],
        [[15840], [60]],
      ],
      [[this.steps[5].quests[0].quest.id, [50]]],
      [
        [this.steps[6].quests[0].quest.id, [1]],
        [67933, [15]],
      ],
      [[this.steps[7].quests[0].quest.id, [1]]],
    ];
    this.createTreeNodes();
  }
}
