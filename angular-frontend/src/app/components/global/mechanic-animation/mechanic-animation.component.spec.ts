import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicAnimationComponent } from './mechanic-animation.component';

describe('MechanicAnimationComponent', () => {
  let component: MechanicAnimationComponent;
  let fixture: ComponentFixture<MechanicAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MechanicAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
