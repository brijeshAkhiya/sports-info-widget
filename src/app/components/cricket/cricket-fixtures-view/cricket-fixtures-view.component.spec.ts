import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketFixturesViewComponent } from './cricket-fixtures-view.component';

describe('CricketFixturesViewComponent', () => {
  let component: CricketFixturesViewComponent;
  let fixture: ComponentFixture<CricketFixturesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketFixturesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketFixturesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
