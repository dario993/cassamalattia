import { Injectable } from '@angular/core';
import { Person } from '../classes/Person';
import { Data } from '../classes/Data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  data: Data;

  persons: Array<Person>  = [];

  session: string;

  private APIURL = "http://localhost/rechner_api/api/offer.php";

  constructor(private http: HttpClient) { 
    if(localStorage.getItem('session')!=null){
      this.session = localStorage.getItem('session');
      this.data = JSON.parse(localStorage.getItem('data'));
    }
    else{

      
      this.data

      this.data = new Data();
      this.data.plz_localita = '';
      this.data.paese_di_domicilio = '';

      this.persons.push(new Person());
      this.data.persons = this.persons;
      
    }
  }


  getData(){
    return this.data;
  }

  setDataPersons(persons){
    this.data.persons = persons;
    console.log("Store data persons: " + this.data);
    this.saveLocalData();
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

    this.saveLocalData();
  }

  saveLocalData(){
    localStorage.setItem('data', JSON.stringify(this.data));
    localStorage.setItem('session', Math.random().toString(36).slice(2) );
  }
  


}
