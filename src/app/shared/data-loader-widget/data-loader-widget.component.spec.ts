import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoaderWidgetComponent } from './data-loader-widget.component';

describe('DataLoaderWidgetComponent', () => {
  let component: DataLoaderWidgetComponent;
  let fixture: ComponentFixture<DataLoaderWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoaderWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoaderWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
