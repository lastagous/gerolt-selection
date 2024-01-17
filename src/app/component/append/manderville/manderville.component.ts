import { Component, OnInit } from '@angular/core';
import { AppendBaseComponent } from '../append-base/append-base.component';

@Component({
  selector: 'app-manderville',
  templateUrl: './manderville.component.html',
  styleUrls: ['../append-base/append-base.component.less'],
})
export class MandervilleComponent extends AppendBaseComponent implements OnInit {
  ngOnInit(): void {
    this.useItems = [
      [[this.steps[0].quests[0].quest.id, [3]]],
      [[this.steps[1].quests[0].quest.id, [3]]],
      [[this.steps[2].quests[0].quest.id, [3]]],
      [[this.steps[3].quests[0].quest.id, [3]]],
    ];
    this.createTreeNodes();
  }
}
