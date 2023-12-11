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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { AccordionModule } from 'primeng/accordion';

import { AppComponent } from './app.component';
import { SearchLodestoneComponent } from './component/search-lodestone/search-lodestone.component';
import { XivapiStore } from './store/xivapi.store';
import { CharacterListComponent } from './component/character-list/character-list.component';
import { LogoStore } from './store/logo.store';
import { LocalStorageService } from './service/local-storage.service';
import { LocalstorageStore } from './store/local-storage.store';
import { StepByStepComponent } from './component/step-by-step/step-by-step.component';
import { StepByStepStore } from './component/step-by-step/step-by-step.store';
import { ProgressStore } from './store/progress.store';
import { FFxivCollectService } from './service/ffxivcollect.service';
import { FFxivCollectStore } from './store/ffxivcollect.store';
import { ZodiacComponent } from './component/append/zodiac/zodiac.component';
import { AnimaComponent } from './component/append/anima/anima.component';
import { AppendBaseComponent } from './component/append/append-base/append-base.component';
import { EulekaComponent } from './component/append/euleka/euleka.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchLodestoneComponent,
    CharacterListComponent,
    StepByStepComponent,
    ZodiacComponent,
    AnimaComponent,
    AppendBaseComponent,
    EulekaComponent,
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
    ToastModule,
    TooltipModule,
    CardModule,
    DividerModule,
    SkeletonModule,
    AccordionModule,
  ],
  providers: [
    LocalStorageService,
    LocalstorageStore,
    LogoStore,
    MessageService,
    XivapiStore,
    StepByStepStore,
    ProgressStore,
    FFxivCollectService,
    FFxivCollectStore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
