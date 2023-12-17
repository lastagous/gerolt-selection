import { Component, OnInit } from '@angular/core';
import { AppendBaseComponent } from '../append-base/append-base.component';

@Component({
  selector: 'app-resistance',
  templateUrl: './resistance.component.html',
  styleUrls: ['../append-base/append-base.component.less'],
})
export class ResistanceComponent extends AppendBaseComponent implements OnInit {
  ngOnInit(): void {
    this.useItems = [
      [[this.steps[0].quests[1].quest.id, [4]]],
      [[this.steps[1].quests[0].quest.id, [20, 20, 20]]],
      [[this.steps[2].quests[0].quest.id, [6]]],
      [[this.steps[3].quests[0].quest.id, [15]]],
      [[this.steps[4].quests[0].quest.id, [15]]],
      [[this.steps[5].quests[0].quest.id, [15]]],
    ];
    this.createTreeNodes();
  }
}
