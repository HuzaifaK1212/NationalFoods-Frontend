import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkListComponent } from './trademark-list.component';

describe('TrademarkListComponent', () => {
  let component: TrademarkListComponent;
  let fixture: ComponentFixture<TrademarkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrademarkListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
