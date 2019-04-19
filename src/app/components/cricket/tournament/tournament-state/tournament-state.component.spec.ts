import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentStateComponent } from './tournament-state.component';

describe('TournamentStateComponent', () => {
  let component: TournamentStateComponent;
  let fixture: ComponentFixture<TournamentStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
