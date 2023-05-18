import { Injectable } from '@angular/core';
import { XviapiService } from '../service/xviapi.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CharacterModel } from '../model/xviapi-character.model';

@Injectable()
export class XviapiStore {
  private _charactersSubject: BehaviorSubject<CharacterModel[]> =
    new BehaviorSubject([] as CharacterModel[]);

  constructor(private _xviapiService: XviapiService) {}

  public getCharacter(id: string): Subscription {
    return this._xviapiService.getCharactor(id).subscribe((character) => {
      console.log(character);
      const characters = this._charactersSubject.getValue();
      characters.push(character);
      this._charactersSubject.next(characters);
    });
  }
}
