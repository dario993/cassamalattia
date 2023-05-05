import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffertsComponent } from './offerts.component';

describe('OffertsComponent', () => {
  let component: OffertsComponent;
  let fixture: ComponentFixture<OffertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
