import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceAddComponent } from './compliance-add.component';

describe('ComplianceAddComponent', () => {
  let component: ComplianceAddComponent;
  let fixture: ComponentFixture<ComplianceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
