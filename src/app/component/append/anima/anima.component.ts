import { Component, Input } from '@angular/core';
import { QuestPartial, Relation } from 'src/types/json-index';
import { StepByStepStore } from '../../step-by-step/step-by-step.store';
import { AppendBaseComponent } from '../append-base/append-base.component';

@Component({
  selector: 'app-anima',
  templateUrl: './anima.component.html',
  styleUrls: ['../append-base/append-base.component.less'],
})
export class AnimaComponent extends AppendBaseComponent {}
