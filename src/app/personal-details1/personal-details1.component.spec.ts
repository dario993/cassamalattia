import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetails1Component } from './personal-details1.component';

describe('PersonalDetails1Component', () => {
  let component: PersonalDetails1Component;
  let fixture: ComponentFixture<PersonalDetails1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDetails1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetails1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
