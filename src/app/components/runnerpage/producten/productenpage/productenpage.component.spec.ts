import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ProductenpageComponent} from './productenpage.component';

describe('OpenstaandComponent', () => {
  let component: ProductenpageComponent;
  let fixture: ComponentFixture<ProductenpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductenpageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductenpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
