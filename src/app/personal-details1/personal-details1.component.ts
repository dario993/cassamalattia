import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Person } from '../classes/Person';

@Component({
  selector: 'app-personal-details1',
  templateUrl: './personal-details1.component.html',
  styleUrls: ['./personal-details1.component.css']
})
export class PersonalDetails1Component implements OnInit {

  family: Person[] = [];

  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
    this.family = this.service.getPersons();
  }

  nextStep(){

  }

  addPerson(){
    this.family.push(new Person());
  }

  removePerson(event, i){
    this.family.splice(i, 1);
  }
}
