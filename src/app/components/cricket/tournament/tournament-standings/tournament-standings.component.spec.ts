import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentStandingsComponent } from './tournament-standings.component';

describe('TournamentStandingsComponent', () => {
  let component: TournamentStandingsComponent;
  let fixture: ComponentFixture<TournamentStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentStandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
