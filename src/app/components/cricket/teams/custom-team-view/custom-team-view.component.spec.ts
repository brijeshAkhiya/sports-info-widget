import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTeamViewComponent } from './custom-team-view.component';

describe('CustomTeamViewComponent', () => {
  let component: CustomTeamViewComponent;
  let fixture: ComponentFixture<CustomTeamViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTeamViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTeamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
