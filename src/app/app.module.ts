import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateComponent } from './template/template.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//Services


import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from  '@angular/material/list';
import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrademarkListComponent } from './pages/trademark/trademark-list/trademark-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MappingService } from './core/services/mapping.service';
import { ConfigService } from './core/services/config.service';
import { DatePipe } from '@angular/common';
import { TrademarkAddComponent } from './pages/trademark/trademark-add/trademark-add.component';
import { BrandProtectionListComponent } from './pages/brand-protection/brand-protection-list/brand-protection-list.component';
import { BrandProtectionAddComponent } from './pages/brand-protection/brand-protection-add/brand-protection-add.component';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SafePipe } from './core/shared/safepipe';
import { ComplianceListComponent } from './pages/compliance/compliance-list/compliance-list.component';
import { ComplianceAddComponent } from './pages/compliance/compliance-add/compliance-add.component';
import { SalesTaxListComponent } from './pages/sales-tax/sales-tax-list/sales-tax-list.component';
import { SalesTaxAddComponent } from './pages/sales-tax/sales-tax-add/sales-tax-add.component';
import { WithholdingTaxListComponent } from './pages/withholding-tax/withholding-tax-list/withholding-tax-list.component';
import { WithholdingTaxAddComponent } from './pages/withholding-tax/withholding-tax-add/withholding-tax-add.component';
import { RepoListComponent } from './pages/repo/repo-list/repo-list.component';
import { RepoSubItemsComponent } from './pages/repo/repo-sub-items/repo-sub-items.component';
import { DialogComponentComponent } from './core/shared/dialog/dialog-component/dialog-component.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    TemplateComponent,
    TrademarkListComponent,
    TrademarkAddComponent,
    BrandProtectionListComponent,
    BrandProtectionAddComponent,
    SchedulerComponent,
    ComplianceListComponent,
    ComplianceAddComponent,
    SalesTaxListComponent,
    SalesTaxAddComponent,
    WithholdingTaxListComponent,
    WithholdingTaxAddComponent,
    RepoListComponent,
    RepoSubItemsComponent,
    DialogComponentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,
    MatPaginatorModule,
    MatChipsModule,
    MatMenuModule,
    MatTreeModule,
    MatStepperModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScheduleModule,
    DropDownButtonModule,
    MatCheckboxModule,
  ],
  providers: [
    MappingService,
    ConfigService,
    DatePipe,
    SafePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }