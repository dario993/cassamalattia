import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFontAwesomeModule }   from 'angular-font-awesome';
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
import { AngularSvgIconModule } from 'angular-svg-icon';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal-details1',
    pathMatch: 'full',
  },

  {
    path: 'personal-details1',
    component: PersonalDetails1Component
  },

  {
    path: 'personal-details2',
    component: PersonalDetails2Component
  },

  {
    path: 'offer',
    component: OfferComponent
  }


]

@NgModule({
  declarations: [
    AppComponent,
    PersonalDetails1Component,
    PersonalDetails2Component,
    OfferComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    NgbModule.forRoot(),
    RoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularSvgIconModule
    
  ],
  providers: [DataService, HttpClientService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
