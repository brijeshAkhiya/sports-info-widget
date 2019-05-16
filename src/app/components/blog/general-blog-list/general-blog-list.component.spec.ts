import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBlogListComponent } from './general-blog-list.component';

describe('GeneralBlogListComponent', () => {
  let component: GeneralBlogListComponent;
  let fixture: ComponentFixture<GeneralBlogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralBlogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
