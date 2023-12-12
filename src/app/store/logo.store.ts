import { Injectable } from '@angular/core';
import _logosJson from '../../assets/logo/logos.json';
import { LogoModel } from '../model/logo.model';

@Injectable()
export class LogoStore {
  private _logo: LogoModel;

  constructor() {
    this._logo = _logosJson[Math.floor(Math.random() * _logosJson.length)];
  }

  public get logo(): LogoModel {
    return this._logo;
  }

  public get logos(): LogoModel[] {
    return _logosJson;
  }
}
