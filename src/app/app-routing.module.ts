import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {Test1Component} from './pages/test1/test1.component';
import {Test2Component} from './pages/test2/test2.component';

const routes: Routes = [
  {
    path: 'test1',
    component: Test1Component
  },
  {
    path: 'test2',
    component: Test2Component,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'test1'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
