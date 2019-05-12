import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBlogCardComponent } from './common-blog-card.component';

describe('CommonBlogCardComponent', () => {
  let component: CommonBlogCardComponent;
  let fixture: ComponentFixture<CommonBlogCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonBlogCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
