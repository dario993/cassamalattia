import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOfferStep2Component } from './selected-offer-step2.component';

describe('SelectedOfferStep2Component', () => {
  let component: SelectedOfferStep2Component;
  let fixture: ComponentFixture<SelectedOfferStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedOfferStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedOfferStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
