import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { RippleModule } from 'primeng/ripple';

import { AppComponent } from './app.component';
import { SearchLodestoneComponent } from './component/search-lodestone/search-lodestone.component';
import { XivapiStore } from './store/xivapi.store';
import { HttpClientModule } from '@angular/common/http';
import { CharacterListComponent } from './component/character-list/character-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchLodestoneComponent,
    CharacterListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataViewModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    RippleModule,
  ],
  providers: [XivapiStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
