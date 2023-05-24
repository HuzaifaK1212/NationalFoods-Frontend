import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkAddComponent } from './trademark-add.component';

describe('TrademarkAddComponent', () => {
  let component: TrademarkAddComponent;
  let fixture: ComponentFixture<TrademarkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrademarkAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademarkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
