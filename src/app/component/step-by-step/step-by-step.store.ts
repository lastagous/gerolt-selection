import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Relation, Tooltip } from 'src/types/json-index';
import tooltipsJson from '../../../assets/data/local/tooltips.json';
import relationsJson from '../../../assets/data/local/relations.json';
import { LocalstorageStore } from 'src/app/store/local-storage.store';

@Injectable()
export class StepByStepStore {
  private _weapons: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['ZW', 'AW', 'EW', 'RW', 'MW']);
  private _selectedWeapon: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _jobs: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _selectedJob: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _steps: BehaviorSubject<Relation[]> = new BehaviorSubject<Relation[]>([]);
  private _relations = relationsJson as Relation[];
  private _tooltips = tooltipsJson as Tooltip[];

  constructor(private _localStorageStore: LocalstorageStore) {
    this.selectedWeapon$.subscribe((selectedWeapon) => {
      switch (selectedWeapon) {
        case 'ZW':
          this.jobs = ['PLD', 'WAR', 'WHM', 'SCH', 'MNK', 'DRG', 'NIN', 'BRD', 'BLM', 'SMN'];
          break;
        case 'AW':
          this.jobs = ['PLD', 'WAR', 'DRK', 'WHM', 'SCH', 'AST', 'MNK', 'DRG', 'NIN', 'BRD', 'MCH', 'BLM', 'SMN'];
          break;
        case 'EW':
          this.jobs = [
            'PLD',
            'WAR',
            'DRK',
            'WHM',
            'SCH',
            'AST',
            'MNK',
            'DRG',
            'NIN',
            'SAM',
            'BRD',
            'MCH',
            'BLM',
            'SMN',
            'RDM',
          ];
          break;
        case 'RW':
          this.jobs = [
            'PLD',
            'WAR',
            'DRK',
            'GNB',
            'WHM',
            'SCH',
            'AST',
            'MNK',
            'DRG',
            'NIN',
            'SAM',
            'BRD',
            'MCH',
            'DNC',
            'BLM',
            'SMN',
            'RDM',
          ];
          break;
        case 'MW':
          this.jobs = [
            'PLD',
            'WAR',
            'DRK',
            'GNB',
            'WHM',
            'SCH',
            'AST',
            'SGE',
            'MNK',
            'DRG',
            'NIN',
            'SAM',
            'RPR',
            'BRD',
            'MCH',
            'DNC',
            'BLM',
            'SMN',
            'RDM',
          ];
          break;
        default:
          break;
      }
      const level = this.level;
      this.steps = this._relations
        .filter(
          (relation) => relation.classJobCategory.Name == this.selectedJob && relation.items[0]?.LevelEquip == level
        )
        .sort((a: Relation, b: Relation) => (a.items[0].LevelItem >= b.items[0].LevelItem ? 1 : -1));
    });
    this.selectedJob$.subscribe((job) => {
      const level = this.level;
      this.steps = this._relations
        .filter((relation) => relation.classJobCategory.Name == job && relation.items[0]?.LevelEquip == level)
        .sort((a: Relation, b: Relation) => (a.items[0].LevelItem >= b.items[0].LevelItem ? 1 : -1));
    });
  }

  public get weapons$(): Observable<string[]> {
    return this._weapons.asObservable();
  }

  public get weapons(): string[] {
    return this._weapons.value;
  }

  private set weapons(value: string[]) {
    this._weapons.next(value);
  }

  public get selectedWeapon$(): Observable<string> {
    return this._selectedWeapon.asObservable();
  }

  public get selectedWeapon(): string {
    return this._selectedWeapon.value;
  }

  public set selectedWeapon(value: string) {
    this._selectedWeapon.next(value);
  }

  public get jobs$(): Observable<string[]> {
    return this._jobs.asObservable();
  }

  public get jobs(): string[] {
    return this._jobs.value;
  }

  private set jobs(value: string[]) {
    this._jobs.next(value);
  }

  public get selectedJob$(): Observable<string> {
    return this._selectedJob.asObservable();
  }

  public get selectedJob(): string {
    return this._selectedJob.value;
  }

  public set selectedJob(value: string) {
    this._selectedJob.next(value);
  }

  public get steps$(): Observable<Relation[]> {
    return this._steps.asObservable();
  }

  public get steps(): Relation[] {
    return this._steps.value;
  }

  private set steps(value: Relation[]) {
    this._steps.next(value);
  }

  public get tooltips(): Tooltip[] {
    return this._tooltips;
  }

  public isAchievementCompleted(id: number): boolean {
    return Boolean(
      this._localStorageStore.selectedCharacter?.data?.Achievements?.List.find((achievement) => achievement.ID === id)
    );
  }

  private get level(): number {
    switch (this.selectedWeapon) {
      case 'ZW':
        return 50;
      case 'AW':
        return 60;
      case 'EW':
        return 70;
      case 'RW':
        return 80;
      case 'MW':
        return 90;
      default:
        return 0;
    }
  }
}
