import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarStepComponent } from './navbar-step.component';

describe('NavbarStepComponent', () => {
  let component: NavbarStepComponent;
  let fixture: ComponentFixture<NavbarStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
