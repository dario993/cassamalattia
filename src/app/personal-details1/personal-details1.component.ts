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

  data: Data;

  constructor(private service: DataService, private fb: FormBuilder, private router: Router){
    this.data = service.getData();
  }

  ngOnInit(){
    this.myForm = this.fb.group({
      plz_localita: this.data.plz_localita,
      paese_di_domicilio:  this.data.paese_di_domicilio,
      persons: this.fb.array([])
    })
    this.initPersons();
  }
  
  
  get personForms(){
    return this.myForm.get('persons') as FormArray;
  }

  getPeopleFormGroup(i){
    this.myForm.get('persons')[i];
  }

  initPersons(){
    let persons: Array<Person> = this.data.persons;
    for(let i=0; i<persons.length; i++){
      const person = this.fb.group({
        nome: [persons[i].nome, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        nascita: [persons[i].nascita, [Validators.required, Validators.minLength(8), Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}')]],
        sesso: [persons[i].sesso, [Validators.required]]
      })
      this.personForms.push(person);
    }
  }

  addPerson(){
    const person = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      nascita: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}')]],
      sesso: ['', [Validators.required]]
    })
    this.personForms.push(person);
  }

  deletePerson(i){
    this.personForms.removeAt(i);
  }

  nextStep(){
    
    console.log("Next step!");
    
    this.service.setDataPersons(this.myForm.value.persons);
    this.router.navigate(['personal-details2']);
    
  }
}