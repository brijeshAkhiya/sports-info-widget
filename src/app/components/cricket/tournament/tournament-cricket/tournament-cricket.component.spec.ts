import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCricketComponent } from './tournament-cricket.component';

describe('TournamentCricketComponent', () => {
  let component: TournamentCricketComponent;
  let fixture: ComponentFixture<TournamentCricketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentCricketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentCricketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
