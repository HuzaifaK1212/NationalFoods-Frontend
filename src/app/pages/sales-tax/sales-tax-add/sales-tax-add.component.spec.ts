import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxAddComponent } from './sales-tax-add.component';

describe('SalesTaxAddComponent', () => {
  let component: SalesTaxAddComponent;
  let fixture: ComponentFixture<SalesTaxAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTaxAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTaxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
