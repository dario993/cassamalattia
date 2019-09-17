import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Person } from '../classes/Person';
import { Data, Utils } from '../classes/Data';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';


@Component({
  selector: 'app-personal-details1',
  templateUrl: './personal-details1.component.html',
  styleUrls: ['./personal-details1.component.css']
})
export class PersonalDetails1Component implements OnInit {

  myForm: FormGroup;

  data: Data;


  constructor(private service: DataService, 
              private fb: FormBuilder, 
              private router: Router){

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
  
  initPersons(){
    let persons: Array<Person> = this.data.persons;
    for(let i=0; i<persons.length; i++){
      
      this.personForms.push(this.fb.group({
        nome: [persons[i].nome, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        nascita: [persons[i].nascita, [Validators.required, Validators.minLength(8), Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}')]],
        franchigie: this.fb.array([]),
        sesso: [persons[i].sesso, [Validators.required]]
      }));
      this.initFranchigie(persons[i], i);
    }
  }


  get personForms(){
    return this.myForm.get('persons') as FormArray;
  }


  initFranchigie(person, k){
    const franchigiaArray = (<FormArray>this.myForm.controls['persons']).at(k).get('franchigie') as FormArray;
    while (franchigiaArray.length) {
      franchigiaArray.removeAt(0);
    }
    for(let i=0; i< person.franchigie.length; i++){
      franchigiaArray.push(this.fb.group({
        id:[this.data.persons[k].franchigie[i].id],
        value: [this.data.persons[k].franchigie[i].value, [Validators.required]],
        selected: [this.data.persons[k].franchigie[i].selected]
      }));
    }
  }


  addPerson(){
    const person = new Person();
    this.data.persons.push(person);
    this.personForms.push(this.fb.group({
      nome: [person.nome, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      nascita: [person.nascita, [Validators.required, Validators.minLength(8), Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}')]],
      franchigie: this.fb.array(person.franchigie),
      sesso: [person.sesso, [Validators.required]]
    }));
    
  }

  changeFranchigia(event, i){
    let franchigie = this.myForm.value.persons[i].franchigie;
    for(let j=0; j<franchigie.length; j++){
      if(franchigie[j].id == event.target.value){
        franchigie[j].selected = "true";
      } 
      else{
        franchigie[j].selected = "false";
      }
    }
  }

  refreshFranchigia(event, i){
    
    // TO-DO
    // solo se il campo è valido, e solo se diverso dal parametro precedente

    let selectPerson = this.myForm.value.persons[i];
    let bithday = new Date(event.target.value);
    let age = this.data.calculateAge(bithday);
    if(age>=0 && age<= 18){
      console.log(Utils.getFranchigiaMinori());
      this.data.persons[i].franchigie =  Utils.getFranchigiaMinori();
    }
    else if(age > 18){
      this.data.persons[i].franchigie = Utils.getFranchigiaAdulti();
    }

    this.initFranchigie(this.myForm.value.persons[i], i);
    
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
