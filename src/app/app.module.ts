import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule }   from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalDetails1Component } from './personal-details1/personal-details1.component';
import { PersonalDetails2Component } from './personal-details2/personal-details2.component';
import { RouterModule, Routes } from '@angular/router'; 
import { DataService } from './services/data.service';

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
  }


]

@NgModule({
  declarations: [
    AppComponent,
    PersonalDetails1Component,
    PersonalDetails2Component
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
