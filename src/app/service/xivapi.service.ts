import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterModel } from '../model/xivapi-character.model';

@Injectable({
  providedIn: 'root',
})
export class XivapiService {
  constructor(private http: HttpClient) {}

  public getCharactor(
    id: string,
    options: any[] = [{ key: 'data', value: 'AC' }]
  ): Observable<CharacterModel> {
    return this.http.get(
      `https://xivapi.com/character/${id}` + this.createOptionString(options)
    ) as Observable<CharacterModel>;
  }

  private createOptionString(options: any[]): string {
    let result = '';
    options.forEach((option) => {
      const pre = options.indexOf(option) == 0 ? '?' : '&';
      result += pre + option.key + '=' + option.value;
    });
    return result;
  }
}
