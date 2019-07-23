import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetails2Component } from './personal-details2.component';

describe('PersonalDetails2Component', () => {
  let component: PersonalDetails2Component;
  let fixture: ComponentFixture<PersonalDetails2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDetails2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
