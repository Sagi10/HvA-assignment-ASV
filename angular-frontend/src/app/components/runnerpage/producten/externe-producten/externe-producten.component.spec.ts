import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExterneProductenComponent } from './externe-producten.component';

describe('ExterneProductenComponent', () => {
  let component: ExterneProductenComponent;
  let fixture: ComponentFixture<ExterneProductenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExterneProductenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExterneProductenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
