import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStoreComponent } from './api-store.component';

describe('ApiStoreComponent', () => {
  let component: ApiStoreComponent;
  let fixture: ComponentFixture<ApiStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
