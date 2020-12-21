import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalDetails1Component } from './personal-details1/personal-details1.component';
import { OfferComponent } from './offer/offer.component';
import { RouteGuardService } from './services/route-guard.service';
import { DetailOfferComponent } from './detail-offer/detail-offer.component';
import { SelectedOfferComponent } from './selected-offer/selected-offer.component';
import { SelectedOfferStep2Component } from './selected-offer-step2/selected-offer-step2.component';
import { NgWizardComponent } from '@cmdap/ng-wizard';

const wizardConfig = {
  name: 'MyWizard',
  navBar: {
    icons: {
      previous: '<i class="material-icons ng-wizard-icon">done</i>',
      current: '<i class="material-icons ng-wizard-icon">create</i>',
      next: '<i class="material-icons ng-wizard-icon">lock</i>',
    },
  },
  buttons: {
    previous: {
      label: '<i class="material-icons ng-wizard-icon">chevron_left</i> Previous',
    },
    next: {
      label: 'Next <i class="material-icons ng-wizard-icon">chevron_right</i>',
    },
  }
};


const routes: Routes = [
  {
    path: '',
    redirectTo: 'rechner/step-1',
    pathMatch: 'full'
  },
  {
    path: 'rechner',
    component: NgWizardComponent,
    children: [
      {
        path: 'step-1',
        component: PersonalDetails1Component
      },
    
      {
        path: 'step-2',
        component: OfferComponent,
        canActivate: [RouteGuardService]
      },
    
      {
        path: 'step-3',
        component: DetailOfferComponent,
        canActivate: [RouteGuardService]
      },
    
      {
        path: 'step-4',
        component: SelectedOfferComponent,
        canActivate: [RouteGuardService]
      },
    
      {
        path: 'step-5',
        component: SelectedOfferStep2Component,
        canActivate: [RouteGuardService]
      },
      {
        path: '',
        redirectTo: 'step-1',
        pathMatch: 'full'
      }
    ],
    data: wizardConfig
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ RouteGuardService ]
})
export class RoutingModule { }
