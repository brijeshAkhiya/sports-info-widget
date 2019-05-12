import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonRelatedBlogCardComponent } from './common-related-blog-card.component';

describe('CommonRelatedBlogCardComponent', () => {
  let component: CommonRelatedBlogCardComponent;
  let fixture: ComponentFixture<CommonRelatedBlogCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonRelatedBlogCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonRelatedBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
