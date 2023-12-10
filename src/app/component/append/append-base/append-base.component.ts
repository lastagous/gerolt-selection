import { Component, Input } from '@angular/core';
import { QuestPartial, Relation } from 'src/types/json-index';
import { StepByStepStore } from '../../step-by-step/step-by-step.store';

@Component({
  selector: 'app-append-base',
  templateUrl: './append-base.component.html',
  styleUrls: ['./append-base.component.less'],
})
export class AppendBaseComponent {
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
}
