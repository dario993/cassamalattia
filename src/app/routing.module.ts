import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalDetails1Component } from './personal-details1/personal-details1.component';
import { PersonalDetails2Component } from './personal-details2/personal-details2.component';
import { OfferComponent } from './offer/offer.component';
import { RouteGuardService } from './services/route-guard.service';
import { DetailOfferComponent } from './detail-offer/detail-offer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal-details1',
    pathMatch: 'full',
  },

  {
    path: 'personal-details1',
    component: PersonalDetails1Component,
    
  },

  {
    path: 'personal-details2',
    component: PersonalDetails2Component,
    canActivate: [RouteGuardService]
  },

  {
    path: 'offer',
    component: OfferComponent,
    canActivate: [RouteGuardService]
  },

  {
    path: 'detail-offer',
    component: DetailOfferComponent,
    canActivate: [RouteGuardService]
  }


]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ RouteGuardService ]
})
export class RoutingModule { }
