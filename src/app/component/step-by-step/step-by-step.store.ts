import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Relation, Tooltip } from 'src/types/json-index';
import tooltipsJson from '../../../assets/data/local/tooltips.json';
import relationsJson from '../../../assets/data/local/relations.json';
import { LocalstorageStore } from 'src/app/store/local-storage.store';
import { Util } from 'src/app/util/util';

@Injectable()
export class StepByStepStore {
  private _weapons: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['ZW', 'AW', 'EW', 'RW', 'MW']);
  private _selectedWeapon: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _jobs: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _selectedJob: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _steps: BehaviorSubject<Relation[]> = new BehaviorSubject<Relation[]>([]);
  private _relations = relationsJson as Relation[];
  private _tooltips = tooltipsJson as Tooltip[];
  private _images = ['war', 'sch', 'mnk', 'blm'];
  private _image = this._images[Math.floor(Math.random() * this._images.length)];

  constructor(private _localStorageStore: LocalstorageStore) {
    this.selectedWeapon$.subscribe((selectedWeapon) => {
      this.jobs = Util.getJobs(selectedWeapon);
      const level = Util.getLevel(selectedWeapon);
      this.steps = this._relations
        .filter(
          (relation) =>
            relation.classJobCategory.Name == this.selectedJob &&
            relation.items[0]?.LevelEquip == level &&
            relation.items[0]?.LevelItem >= 60
        )
        .sort((a: Relation, b: Relation) => (a.items[0].LevelItem >= b.items[0].LevelItem ? 1 : -1));
    });
    this.selectedJob$.subscribe((job) => {
      const level = Util.getLevel(this.selectedWeapon);
      this.steps = this._relations
        .filter(
          (relation) =>
            relation.classJobCategory.Name == job &&
            relation.items[0]?.LevelEquip == level &&
            relation.items[0]?.LevelItem >= 60
        )
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

  public get relations(): Relation[] {
    return this._relations;
  }

  public get tooltips(): Tooltip[] {
    return this._tooltips;
  }

  public get images(): string[] {
    return this._images;
  }

  public get image(): string {
    return this._image;
  }

  public isAchievementCompleted(id: number): boolean {
    const selectedCharacter = this._localStorageStore.selectedCharacter;
    return Boolean(
      selectedCharacter?.data?.Achievements?.List.find((achievement) => achievement.ID === id) ||
        selectedCharacter?.collect?.achievements.find((achievement) => achievement.id === id)
    );
  }
}
