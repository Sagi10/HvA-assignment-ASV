import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BijzondereProductenComponent } from './bijzondere-producten.component';

describe('BijzondereProductenComponent', () => {
  let component: BijzondereProductenComponent;
  let fixture: ComponentFixture<BijzondereProductenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BijzondereProductenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BijzondereProductenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
