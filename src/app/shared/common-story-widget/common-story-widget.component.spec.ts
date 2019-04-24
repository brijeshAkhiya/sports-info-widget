import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStoryWidgetComponent } from './common-story-widget.component';

describe('CommonStoryWidgetComponent', () => {
  let component: CommonStoryWidgetComponent;
  let fixture: ComponentFixture<CommonStoryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonStoryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonStoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
