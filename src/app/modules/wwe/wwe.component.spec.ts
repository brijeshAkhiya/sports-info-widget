import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WweComponent } from './wwe.component';

describe('WweComponent', () => {
  let component: WweComponent;
  let fixture: ComponentFixture<WweComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WweComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
