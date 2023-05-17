import { Component } from '@angular/core';

@Component({
  selector: 'app-search-lodestone',
  templateUrl: './search-lodestone.component.html',
  styleUrls: ['./search-lodestone.component.less'],
})
export class SearchLodestoneComponent {
  private _searchString: string;
  private _isSearching = false;

  public get searchString(): string {
    return this._searchString;
  }

  public set searchString(value: string) {
    this._searchString = value;
  }

  public get isSearching(): boolean {
    return this._isSearching;
  }

  public onKeyDownEnter(event: any) {
    this._isSearching = true;
    console.log(this._searchString);
    this._isSearching = true;
  }
}
