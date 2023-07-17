import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from "src/app/template/template.component";
import { TrademarkListComponent } from './pages/trademark/trademark-list/trademark-list.component';
import { TrademarkAddComponent } from './pages/trademark/trademark-add/trademark-add.component';
import { BrandProtectionListComponent } from './pages/brand-protection/brand-protection-list/brand-protection-list.component';
import { BrandProtectionAddComponent } from './pages/brand-protection/brand-protection-add/brand-protection-add.component';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { ComplianceListComponent } from './pages/compliance/compliance-list/compliance-list.component';
import { ComplianceAddComponent } from './pages/compliance/compliance-add/compliance-add.component';
import { SalesTaxListComponent } from './pages/sales-tax/sales-tax-list/sales-tax-list.component';
import { SalesTaxAddComponent } from './pages/sales-tax/sales-tax-add/sales-tax-add.component';
import { WithholdingTaxListComponent } from './pages/withholding-tax/withholding-tax-list/withholding-tax-list.component';
import { WithholdingTaxAddComponent } from './pages/withholding-tax/withholding-tax-add/withholding-tax-add.component';
import { RepoListComponent } from './pages/repo/repo-list/repo-list.component';
import { RepoSubItemsComponent } from './pages/repo/repo-sub-items/repo-sub-items.component';
import { LoginComponent } from './pages/login/login.component';

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
    path: 'scheduler/trademarks',
    component: SchedulerComponent
  },
  {
    path: 'scheduler/compliances',
    component: SchedulerComponent
  },
  {
    path: 'compliances',
    component: ComplianceListComponent
  },
  {
    path: 'compliances/add',
    component: ComplianceAddComponent
  },
  {
    path: 'compliances/edit/:id',
    component: ComplianceAddComponent
  },
  {
    path: 'sales-taxes',
    component: SalesTaxListComponent
  },
  {
    path: 'sales-taxes/add',
    component: SalesTaxAddComponent
  },
  {
    path: 'sales-taxes/edit/:id',
    component: SalesTaxAddComponent
  },
  {
    path: 'withholding-taxes',
    component: WithholdingTaxListComponent
  },
  {
    path: 'withholding-taxes/add',
    component: WithholdingTaxAddComponent
  },
  {
    path: 'withholding-taxes/edit/:id',
    component: WithholdingTaxAddComponent
  },
  {
    path: 'repo',
    component: RepoListComponent
  },
  {
    path: 'repo-sub-items',
    component: RepoSubItemsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
