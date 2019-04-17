import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketFixturesComponent } from './cricket-fixtures.component';

describe('CricketFixturesComponent', () => {
  let component: CricketFixturesComponent;
  let fixture: ComponentFixture<CricketFixturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketFixturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
