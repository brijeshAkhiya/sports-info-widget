import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketTourMenuComponent } from './cricket-tour-menu.component';

describe('CricketTourMenuComponent', () => {
  let component: CricketTourMenuComponent;
  let fixture: ComponentFixture<CricketTourMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketTourMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketTourMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
