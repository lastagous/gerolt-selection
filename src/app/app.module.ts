import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { SearchLodestoneComponent } from './component/search-lodestone/search-lodestone.component';
import { XivapiStore } from './store/xivapi.store';
import { CharacterListComponent } from './component/character-list/character-list.component';
import { ProgressPanelComponent } from './component/progress-panel/progress-panel.component';
import { ProgressPanelStore } from './store/progress-panel.store';
import { CookieStore } from './store/cookie.store';
import { LogoStore } from './store/logo.store';

@NgModule({
  declarations: [
    AppComponent,
    SearchLodestoneComponent,
    CharacterListComponent,
    ProgressPanelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    ChipModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    RippleModule,
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
    ScrollPanelModule,
    TableModule,
    TabMenuModule,
    TooltipModule,
  ],
  providers: [
    CookieService,
    CookieStore,
    LogoStore,
    ProgressPanelStore,
    XivapiStore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
