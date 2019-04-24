import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonNewsListComponent } from './common-news-list.component';

describe('CommonNewsListComponent', () => {
  let component: CommonNewsListComponent;
  let fixture: ComponentFixture<CommonNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
