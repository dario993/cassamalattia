import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Person } from '../classes/Person';
import { Data, Franchigia } from '../classes/Data';
import { Observable } from 'rxjs';
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

  initFranchigie(element, k){
    for(let i=0; i< element.franchigie.length; i++){
      const franchigiaArray = (<FormArray>this.myForm.controls['persons']).at(k).get('franchigie') as FormArray;

      franchigiaArray.push(this.fb.group({
        id:[this.data.persons[k].franchigie[i].id],
        value: [this.data.persons[k].franchigie[i].value],
        selected: [this.data.persons[k].franchigie[i].selected]
      }));

    }
  }


  addPerson(){
    this.personForms.push(this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      nascita: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}')]],
      franchigie: this.fb.array(this.buildFormArray(defaultFranchigia)),
      sesso: ['', [Validators.required]]
    }));
    //da finire
    
  }

  deletePerson(i){
    this.personForms.removeAt(i);
  }
  
  public buildFormArray(controllers: any) {
    return controllers.map(ctrl => {
      return this.fb.group({
        id: [ctrl.id],
        value: [ctrl.value, Validators.required],
        selected: [ctrl.selected]
      });
    });
  }

  nextStep(){
    
    console.log("Next step!");
    
    this.service.setDataPersons(this.myForm.value.persons);
    this.router.navigate(['personal-details2']);
    
  }
}
