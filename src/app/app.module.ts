import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonalDetails1Component } from './personal-details1/personal-details1.component';
import { PersonalDetails2Component } from './personal-details2/personal-details2.component';
import { Routes } from '@angular/router'; 
import { DataService } from './services/data.service';
import { HttpClientService } from './services/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OfferComponent } from './offer/offer.component';
import { RoutingModule } from './routing.module';
import { AuthService } from './services/auth.service';
import { DetailOfferComponent } from './detail-offer/detail-offer.component';
import { SelectedOfferComponent } from './selected-offer/selected-offer.component';
import { SelectedOfferStep2Component } from './selected-offer-step2/selected-offer-step2.component';
import '@angular/common/locales/global/de-CH';
import { NgWizardModule } from '@cmdap/ng-wizard';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpErrorIntercept } from './http-interceptors/http-error.interceptor';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './admin/login/login.component';
import { OffertsComponent } from './admin/offerts/offerts.component';
import { SignupComponent } from './admin/signup/signup.component';
import { ViewOffertComponent } from './admin/view-offert/view-offert.component';

const httpInterceptProviders= [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorIntercept, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    PersonalDetails1Component,
    PersonalDetails2Component,
    OfferComponent,
    DetailOfferComponent,
    SelectedOfferComponent,
    SelectedOfferStep2Component,
    SpinnerComponent,
    NavComponent,

    LoginComponent,
    OffertsComponent,
    SignupComponent,
    ViewOffertComponent

  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    NgbModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgWizardModule,
    
    FormsModule
  ],
  providers: [DataService, HttpClientService, httpInterceptProviders, AuthService, { provide: LOCALE_ID, useValue: 'de-CH' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
