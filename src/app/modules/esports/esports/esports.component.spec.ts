import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsportsComponent } from './esports.component';

describe('EsportsComponent', () => {
  let component: EsportsComponent;
  let fixture: ComponentFixture<EsportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
