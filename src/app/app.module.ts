import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalDetails1Component } from './personal-details1/personal-details1.component';
import { PersonalDetails2Component } from './personal-details2/personal-details2.component';
import { Routes } from '@angular/router'; 
import { DataService } from './services/data.service';
import { HttpClientService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { OfferComponent } from './offer/offer.component';
import { RoutingModule } from './routing.module';
import { AuthService } from './services/auth.service';
import { DetailOfferComponent } from './detail-offer/detail-offer.component';
import { SelectedOfferComponent } from './selected-offer/selected-offer.component';
import { SelectedOfferStep2Component } from './selected-offer-step2/selected-offer-step2.component';
import { NavbarStepComponent } from './navbar-step/navbar-step.component';


@NgModule({
  declarations: [
    NavbarStepComponent,
    AppComponent,
    PersonalDetails1Component,
    PersonalDetails2Component,
    OfferComponent,
    DetailOfferComponent,
    SelectedOfferComponent,
    SelectedOfferStep2Component
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    NgbModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [DataService, HttpClientService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
