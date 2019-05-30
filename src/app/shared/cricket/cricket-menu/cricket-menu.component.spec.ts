import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketMenuComponent } from './cricket-menu.component';

describe('CricketMenuComponent', () => {
  let component: CricketMenuComponent;
  let fixture: ComponentFixture<CricketMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
