import { Injectable } from '@angular/core';
import { Person } from '../classes/Person';
import { Data, Franchigia } from '../classes/Data';

@Injectable()
export class DataService {

  data: Data;

  persons: Array<Person>  = [];


  constructor() { 
    this.data = new Data();
    this.data.plz_localita = '';
    this.data.paese_di_domicilio = '';

    this.persons.push(new Person());
    this.data.persons = this.persons;

     
  }

  getData(){
    return this.data;
  }

  setDataPersons(persons){
    console.log("Store Data");
    this.data.persons = persons;

    console.log(this.data);
  }

  setGlobalData(data: Data){
    if(data.plz_localita !== undefined ){
      this.data.plz_localita = data.plz_localita;
    }
    
    if(data.paese_di_domicilio !== undefined ){
      this.data.paese_di_domicilio = data.paese_di_domicilio;
    }

    if(data.email !== undefined ){
      this.data.email = data.email;
    }
  }

  getFranchigie() {
    return ['100', '200', '300'];
  }

}
