import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithholdingTaxAddComponent } from './withholding-tax-add.component';

describe('WithholdingTaxAddComponent', () => {
  let component: WithholdingTaxAddComponent;
  let fixture: ComponentFixture<WithholdingTaxAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithholdingTaxAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithholdingTaxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
