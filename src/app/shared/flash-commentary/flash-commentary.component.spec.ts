import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCommentaryComponent } from './flash-commentary.component';

describe('FlashCommentaryComponent', () => {
  let component: FlashCommentaryComponent;
  let fixture: ComponentFixture<FlashCommentaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashCommentaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCommentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
