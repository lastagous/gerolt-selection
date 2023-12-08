import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FFxivCollectAchievementModel, FFxivCollectCharacterModel } from '../model/ffxivcollect-character.model';

@Injectable({
  providedIn: 'root',
})
export class FFxivCollectService {
  constructor(private http: HttpClient) {}

  public getCharactor(id: string): Observable<FFxivCollectCharacterModel> {
    return this.http.get(`https://ffxivcollect.com/api/characters/${id}`) as Observable<FFxivCollectCharacterModel>;
  }

  public getAchievements(characterId: string): Observable<FFxivCollectAchievementModel[]> {
    return this.http.get(`https://ffxivcollect.com/api/characters/${characterId}/achievements/owned`) as Observable<
      FFxivCollectAchievementModel[]
    >;
  }
}
