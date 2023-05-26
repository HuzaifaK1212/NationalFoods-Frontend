import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from "src/app/template/template.component";
import { TrademarkListComponent } from './pages/trademark/trademark-list/trademark-list.component';
import { TrademarkAddComponent } from './pages/trademark/trademark-add/trademark-add.component';
import { BrandProtectionListComponent } from './pages/brand-protection/brand-protection-list/brand-protection-list.component';
import { BrandProtectionAddComponent } from './pages/brand-protection/brand-protection-add/brand-protection-add.component';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';

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
    path: 'brand-protections',
    component: BrandProtectionListComponent,
    children: [
      {
        path: 'add',
        redirectTo: 'brand-protections/add',
        pathMatch: 'full'
      },
      {
        path: 'edit',
        redirectTo: 'brand-protections/edit/:id',
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
  },
  {
    path: 'brand-protections/add',
    component: BrandProtectionAddComponent
  },
  {
    path: 'brand-protections/edit/:id',
    component: BrandProtectionAddComponent
  },
  {
    path: 'scheduler',
    component: SchedulerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
