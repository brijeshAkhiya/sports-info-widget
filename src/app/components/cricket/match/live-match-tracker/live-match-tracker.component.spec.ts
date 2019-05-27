import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMatchTrackerComponent } from './live-match-tracker.component';

describe('LiveMatchTrackerComponent', () => {
  let component: LiveMatchTrackerComponent;
  let fixture: ComponentFixture<LiveMatchTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMatchTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMatchTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
