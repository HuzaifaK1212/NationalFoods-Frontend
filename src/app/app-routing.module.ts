import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from "src/app/template/template.component";
import { TrademarkListComponent } from './pages/trademark/trademark-list/trademark-list.component';
import { TrademarkAddComponent } from './pages/trademark/trademark-add/trademark-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trademarks',
    pathMatch: 'full'
  },
  {
    path: 'trademarks',
    component: TrademarkListComponent,
    children: [
      {
        path: 'add',
        redirectTo: 'trademarks/add',
        // component: TrademarkAddComponent,
        pathMatch: 'full'
      },
      {
        path: 'edit',
        redirectTo: 'trademarks/edit/:id',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'trademarks/add',
    component: TrademarkAddComponent
  },
  {
    path: 'trademarks/edit/:id',
    component: TrademarkAddComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
