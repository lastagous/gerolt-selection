import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { XivapiCharacterModel } from '../model/xivapi-character.model';

@Injectable({
  providedIn: 'root',
})
export class XivapiService {
  constructor(private http: HttpClient) {}

  public getCharactor(
    id: string,
    options: any[] = [{ key: 'data', value: 'AC' }]
  ): Observable<XivapiCharacterModel> {
    return this.http.get(
      `https://xivapi.com/character/${id}` + this.createOptionString(options)
    ) as Observable<XivapiCharacterModel>;
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
