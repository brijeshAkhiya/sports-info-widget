import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketTeamsComponent } from './cricket-teams.component';

describe('CricketTeamsComponent', () => {
  let component: CricketTeamsComponent;
  let fixture: ComponentFixture<CricketTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
