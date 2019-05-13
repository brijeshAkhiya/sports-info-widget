import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAdsWidgetComponent } from './custom-ads-widget.component';

describe('CustomAdsWidgetComponent', () => {
  let component: CustomAdsWidgetComponent;
  let fixture: ComponentFixture<CustomAdsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAdsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAdsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
