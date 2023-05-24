import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandProtectionListComponent } from './brand-protection-list.component';

describe('BrandProtectionListComponent', () => {
  let component: BrandProtectionListComponent;
  let fixture: ComponentFixture<BrandProtectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandProtectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandProtectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
