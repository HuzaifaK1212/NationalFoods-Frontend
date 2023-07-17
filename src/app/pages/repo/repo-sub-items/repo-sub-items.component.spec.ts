import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoSubItemsComponent } from './repo-sub-items.component';

describe('RepoSubItemsComponent', () => {
  let component: RepoSubItemsComponent;
  let fixture: ComponentFixture<RepoSubItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoSubItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoSubItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
