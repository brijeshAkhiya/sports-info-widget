import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturesSidebarWidgetComponent } from './fixtures-sidebar-widget.component';

describe('FixturesSidebarWidgetComponent', () => {
  let component: FixturesSidebarWidgetComponent;
  let fixture: ComponentFixture<FixturesSidebarWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturesSidebarWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturesSidebarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
