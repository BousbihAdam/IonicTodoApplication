import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedometrePage } from './pedometre.page';

describe('PedometrePage', () => {
  let component: PedometrePage;
  let fixture: ComponentFixture<PedometrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedometrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedometrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
