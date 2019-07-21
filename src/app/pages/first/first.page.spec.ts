import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPage } from './first.page';

describe('FirstPage', () => {
  let component: FirstPage;
  let fixture: ComponentFixture<FirstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
