import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandProtectionAddComponent } from './brand-protection-add.component';

describe('BrandProtectionAddComponent', () => {
  let component: BrandProtectionAddComponent;
  let fixture: ComponentFixture<BrandProtectionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandProtectionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandProtectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
