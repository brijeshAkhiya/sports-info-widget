import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketHomeComponent } from './cricket-home.component';

describe('CricketHomeComponent', () => {
  let component: CricketHomeComponent;
  let fixture: ComponentFixture<CricketHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
