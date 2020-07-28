import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOfferComponent } from './selected-offer.component';

describe('SelectedOfferComponent', () => {
  let component: SelectedOfferComponent;
  let fixture: ComponentFixture<SelectedOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
