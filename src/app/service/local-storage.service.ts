import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
