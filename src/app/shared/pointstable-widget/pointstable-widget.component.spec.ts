import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointstableWidgetComponent } from './pointstable-widget.component';

describe('PointstableWidgetComponent', () => {
  let component: PointstableWidgetComponent;
  let fixture: ComponentFixture<PointstableWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointstableWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointstableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
