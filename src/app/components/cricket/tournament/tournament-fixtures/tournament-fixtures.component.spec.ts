import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentFixturesComponent } from './tournament-fixtures.component';

describe('TournamentFixturesComponent', () => {
  let component: TournamentFixturesComponent;
  let fixture: ComponentFixture<TournamentFixturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentFixturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
