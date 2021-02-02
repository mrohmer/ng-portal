import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PortalModule} from '../../projects/rohmer/ng-portal/src/public-api';
import { Test1Component } from './pages/test1/test1.component';
import { Test2Component } from './pages/test2/test2.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Test2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PortalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
