import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataWidgetComponent } from './no-data-widget.component';

describe('NoDataWidgetComponent', () => {
  let component: NoDataWidgetComponent;
  let fixture: ComponentFixture<NoDataWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDataWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
