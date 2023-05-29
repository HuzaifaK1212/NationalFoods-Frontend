import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithholdingTaxListComponent } from './withholding-tax-list.component';

describe('WithholdingTaxListComponent', () => {
  let component: WithholdingTaxListComponent;
  let fixture: ComponentFixture<WithholdingTaxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithholdingTaxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithholdingTaxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
