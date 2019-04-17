import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketSeriesComponent } from './cricket-series.component';

describe('CricketSeriesComponent', () => {
  let component: CricketSeriesComponent;
  let fixture: ComponentFixture<CricketSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
