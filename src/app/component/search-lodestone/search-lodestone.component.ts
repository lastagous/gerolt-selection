import { Component } from '@angular/core';
import { XivapiStore } from 'src/app/store/xivapi.store';

@Component({
  selector: 'app-search-lodestone',
  templateUrl: './search-lodestone.component.html',
  styleUrls: ['./search-lodestone.component.less'],
})
export class SearchLodestoneComponent {
  private _searchString: string;
  private _isSearchBoxError: boolean;

  constructor(private _xivapiStore: XivapiStore) {}

  public get searchString(): string {
    return this._searchString;
  }

  public set searchString(value: string) {
    this._searchString = value;
  }

  public get isSearchBoxError(): boolean {
    return this._isSearchBoxError;
  }

  public get isCharacterFetcing(): boolean {
    return this._xivapiStore.isCharacterFetcing;
  }

  public onKeyDownEnter(event: any): void {
    const id = this._searchString.match(
      new RegExp('finalfantasyxiv.com/lodestone/character/([^/]+)/?')
    )?.[1];
    if (id) {
      this._searchString = '';
      this._isSearchBoxError = false;
      this._xivapiStore.getCharacter(id);
    } else {
      this._isSearchBoxError = true;
    }
  }
}
