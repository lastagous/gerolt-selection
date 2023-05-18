import { Component } from '@angular/core';
import { XviapiStore } from 'src/app/store/xviapi.store';

@Component({
  selector: 'app-search-lodestone',
  templateUrl: './search-lodestone.component.html',
  styleUrls: ['./search-lodestone.component.less'],
})
export class SearchLodestoneComponent {
  private _searchString: string;
  private _isSearching = false;

  constructor(private _xviapiStore: XviapiStore) {}

  public get searchString(): string {
    return this._searchString;
  }

  public set searchString(value: string) {
    this._searchString = value;
  }

  public get isSearching(): boolean {
    return this._isSearching;
  }

  public async onKeyDownEnter(event: any): Promise<void> {
    this._isSearching = true;
    const id = this._searchString.match(
      new RegExp('/lodestone/character/([^/]+)/?')
    )?.[1];
    console.log(id);
    if (id) {
      await this._xviapiStore.getCharacter(id);
    }
    this._isSearching = false;
  }
}
