import { Injectable } from '@angular/core';
import { Person } from '../classes/Person';
import { Data, Plz, DataCliente } from '../classes/Data';
import { HttpClientService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class DataService {

  data: Data;

  queryParams;
  datadinascita;
  NPALocalita_id;
  NPALocalita;

  persons: Array<Person>  = [];

  session: string;

  private APIURL = "http://localhost/rechner_api/api/offer.php";

    constructor(private http: HttpClientService, private route: ActivatedRoute) { 
      this.queryParams = this.route.queryParams.subscribe( params => {
      this.datadinascita = params['datadinascita'];
      this.NPALocalita_id = params['NPALocalita_id'];
      this.NPALocalita = params['NPALocalita'];
      });
      
      if(this.datadinascita !== undefined && this.NPALocalita_id !== undefined){
        localStorage.removeItem('session');
        localStorage.removeItem('data');
      }

      if(localStorage.getItem('session')!==null){
        this.session = localStorage.getItem('session');
        this.data = JSON.parse(localStorage.getItem('data'));
      }
      else{ 
        this.data = new Data();
        this.data.plz_localita = '';
        this.data.paese_di_domicilio = '';
        this.data.id_offerta = 0; 

        this.persons.push(new Person());
        this.data.persons = this.persons;
        this.data.dataCliente = new DataCliente();
      }

      if(this.datadinascita !== undefined && this.NPALocalita_id !== undefined){
         this.data.plz_localita = { 'id' : this.NPALocalita_id, 'plz' : this.NPALocalita };
         this.data.persons[0].nascita = this.datadinascita;
      }
      
   
  }


  getData(){
    return this.data;
  }

  setDataPersons(persons){
    this.data.persons = persons;
    console.log("Store data persons: " + this.data.persons.toString());
    this.saveLocalData();
  }

  setOffertData(offert){
    this.data.offert = offert;
    this.saveLocalData();
  }

  setGlobalData(data: Data){
    
    if(data.plz_localita !== undefined ){
      this.data.plz_localita = data.plz_localita;
    }
    
    if(data.paese_di_domicilio !== undefined ){
      this.data.paese_di_domicilio = data.paese_di_domicilio;
    }


    if(data.persons !== undefined){
      this.data.persons = data.persons;
    }

    if(data.offert !== undefined){
      this.data.offert = data.offert;
    }

    if(data.dataCliente !== undefined){
      this.data.dataCliente = data.dataCliente;
    }

    if(data.level_offert !== undefined){
      this.data.level_offert = data.level_offert;
    }


    this.saveLocalData();
  }

  setSelectedOffert(offert){
    this.data.selectedOffert = offert;
  }

  getSelectedOffert(){
    return this.data.selectedOffert;
  }


  saveLocalData(){
    localStorage.setItem('data', JSON.stringify(this.data));
    if(localStorage.getItem('session')==null){
      localStorage.setItem('session', Math.random().toString(36).slice(2) );
    }
  }
  



}
