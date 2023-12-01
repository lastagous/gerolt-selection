import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LogoStore } from './store/logo.store';
// import { SearchJsonStore } from './store/search-json-data.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private _logoStore: LogoStore
  ) // private _searchJsonStore: SearchJsonStore
  {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  public get logoPath(): string {
    return this._logoStore.logo.filePath;
  }

  public get logoCreator(): string {
    return this._logoStore.logo.creatorName
      ? this._logoStore.logo.creatorName
      : '匿名希望';
  }

  public get logoLink(): string {
    return this._logoStore.logo.link;
  }

  title = 'ゲロルトの工匠記録';
}
