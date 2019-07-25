import { Injectable } from '@angular/core';
import { Person } from '../classes/Person';

@Injectable()
export class DataService {

  family: Person[]  = [];


  constructor() { 
    if(this.family.length == 0){
      this.family.push(new Person());
    }
  }


  getPersons(){
    return this.family;
  }

  updateDataStep1( persons: Array<Person> ){
    for (let i=0;  persons.length; i++ ){
      this.family[i].nome = persons[i].nome;
      this.family[i].nascita = persons[i].nascita;
      this.family[i].sesso = persons[i].sesso; 
       
    }
  }

}
