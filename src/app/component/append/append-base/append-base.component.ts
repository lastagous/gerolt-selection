import { Component, Input } from '@angular/core';
import { Instance, QuestPartial, Relation } from 'src/types/json-index';
import { StepByStepStore } from '../../step-by-step/step-by-step.store';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  constructor(private _stepByStepStore: StepByStepStore, private domSanitizer: DomSanitizer) {}

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

  public getTooltip(id: number, urlType: string): string {
    const baseUrl = `https://jp.finalfantasyxiv.com/lodestone/playguide/db/${urlType}/`;
    const tooltipId = this._stepByStepStore.tooltips.find((tooltip) => tooltip.id == id)?.tooltipId;
    return `${baseUrl}${tooltipId ? tooltipId : ''}${tooltipId ? '/' : ''}`;
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

  public log(e: any) {
    console.log(e);
  }
}
