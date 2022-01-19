import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnerAnimationComponent } from './runner-animation.component';

describe('RunnerAnimationComponent', () => {
  let component: RunnerAnimationComponent;
  let fixture: ComponentFixture<RunnerAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunnerAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunnerAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
