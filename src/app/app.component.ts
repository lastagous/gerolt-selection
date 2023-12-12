import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LogoStore } from './store/logo.store';
import { LogoModel } from './model/logo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  private _sidebarVisible = false;

  constructor(private primengConfig: PrimeNGConfig, private _logoStore: LogoStore) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  public get sidebarVisible(): boolean {
    return this._sidebarVisible;
  }

  public set sidebarVisible(value: boolean) {
    this._sidebarVisible = value;
  }

  public get logos(): LogoModel[] {
    return this._logoStore.logos;
  }

  public get logoPath(): string {
    return this._logoStore.logo.filePath;
  }

  public get logoCreator(): string {
    return this._logoStore.logo.creatorName ? this._logoStore.logo.creatorName : '匿名希望';
  }

  public get logoLink(): string {
    return this._logoStore.logo.link;
  }

  title = 'ゲロルトの工匠記録';
}
