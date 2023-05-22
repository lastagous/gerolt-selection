import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieCharacterModel } from '../model/cookie.model';

@Injectable()
export class CookieStore {
  private _characters: CookieCharacterModel[] = [];
  constructor(private _cookieService: CookieService) {
    this._characters = this._cookieService.get('characters')
      ? (JSON.parse(
          this._cookieService.get('characters')
        ) as CookieCharacterModel[])
      : [];
  }

  public get characters(): CookieCharacterModel[] {
    return this._characters;
  }

  public set characters(value: CookieCharacterModel[]) {
    this._cookieService.set('characters', JSON.stringify(value));
    this._characters = value;
  }

  public setCharacter(value: CookieCharacterModel) {
    const characters = this._cookieService.get('characters')
      ? (
          JSON.parse(
            this._cookieService.get('characters')
          ) as CookieCharacterModel[]
        ).filter((char) => char.ID !== value.ID)
      : [];
    characters.push(value);
    this.characters = characters;
  }

  public removeCharacter(id: number) {
    this.characters = this._cookieService.get('characters')
      ? (
          JSON.parse(
            this._cookieService.get('characters')
          ) as CookieCharacterModel[]
        ).filter((char) => char.ID !== id)
      : [];
  }
}
