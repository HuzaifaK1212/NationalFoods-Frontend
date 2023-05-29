import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxListComponent } from './sales-tax-list.component';

describe('SalesTaxListComponent', () => {
  let component: SalesTaxListComponent;
  let fixture: ComponentFixture<SalesTaxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTaxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTaxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
