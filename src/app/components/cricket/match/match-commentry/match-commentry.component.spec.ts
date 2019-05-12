import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCommentryComponent } from './match-commentry.component';

describe('MatchCommentryComponent', () => {
  let component: MatchCommentryComponent;
  let fixture: ComponentFixture<MatchCommentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchCommentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCommentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
