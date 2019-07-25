import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Person } from '../classes/Person';
import { Data } from '../classes/Data';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details1',
  templateUrl: './personal-details1.component.html',
  styleUrls: ['./personal-details1.component.css']
})
export class PersonalDetails1Component implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.myForm = this.fb.group({
      plz_localita:'',
      paese_di_domicilio: '',
      persons: this.fb.array([])
    })
    this.addPerson();
  }
  
  get personForms(){
    return this.myForm.get('persons') as FormArray;
  }

  addPerson(){
    const person = this.fb.group({
      nome: [],
      nascita: [],
      sesso: []
    })
    this.personForms.push(person);
  }

  deletePerson(i){
    this.personForms.removeAt(i);
  }
}
