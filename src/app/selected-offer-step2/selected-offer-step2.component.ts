import { Component, OnInit } from '@angular/core';
import { Data, DataCliente } from '../classes/Data';
import { HttpClientService } from '../services/http.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Person } from '../classes/Person';
import { NgWizardStep } from '@cmdap/ng-wizard';

@Component({
  selector: 'app-selected-offer-step2',
  templateUrl: './selected-offer-step2.component.html',
  styleUrls: ['./selected-offer-step2.component.css']
})
export class SelectedOfferStep2Component extends NgWizardStep implements OnInit {

  data: Data;

  formDataPerson: FormGroup;

  dataCliente: DataCliente;
  selectedOffert;

  constructor(private http: HttpClientService,
              private service: DataService,
              private fb: FormBuilder,
              private router: Router,) { 
                super();
                this.data = service.getData();
                this.dataCliente = this.data.dataCliente;
                this.selectedOffert = this.data.selectedOffert;
                this.setSelectedBenefits();
              }

  ngOnInit(): void {

    this.formDataPerson = this.fb.group({
      persons: this.fb.array([]),
      plz_localita: [this.data.plz_localita['plz']],
      nome_contraente: [this.data.dataCliente.nome_contraente, [Validators.required]  ],
      via: [this.data.dataCliente.via,  [ Validators.required]],
      telefono: [this.data.dataCliente.telefono, [Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      email: [this.data.dataCliente.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      lingua: [this.data.dataCliente.lingua, [Validators.required]]

    });
    this.initPersons();
    

    console.log(this.data);
  }
 

  setSelectedBenefits(){
    for(let i=0; i< this.data.persons.length; i++){
      let listbenefits = this.getListElementSelected(this.data.persons[i].benefits);
      if(this.getListElementSelected(this.data.persons[i].hospital).length>0){
        listbenefits.push(this.getListElementSelected(this.data.persons[i].hospital));
      }
      this.data.selectedOffert['persone'][i]['listbenefits'] = listbenefits;
    }      
  }

  getListElementSelected(benefits){
    let list = [];
    benefits.forEach(benefit => {
      if(benefit['selected'] == 'true'){
        list.push(benefit['title']);
      }
    });
    return list;
  }
  
  initPersons(){
    let persons: Array<Person> = this.data.persons;
    for(let i=0; i<persons.length; i++){
      
      this.personForms.push(this.fb.group({
        nome: [persons[i].nome, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        cognome: [persons[i].cognome, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]]
      }));
    }
  }

  get personForms(){
    return this.formDataPerson.get('persons') as FormArray;
  }


  get nome_contraente() { return this.formDataPerson.get('nome_contraente'); }
  get via() { return this.formDataPerson.get('via'); }
  get telefono() { return this.formDataPerson.get('telefono'); }
  get email() { return this.formDataPerson.get('email'); }
  get lingua() { return this.formDataPerson.get('lingua'); }

 

  nextStep(){
    this.data.dataCliente.assicurato_presso = this.data.selectedOffert['persone'][0]['nome_display'];
    this.data.dataCliente.nome_contraente = this.formDataPerson.value.nome_contraente;
    this.data.dataCliente.via = this.formDataPerson.value.via;
    this.data.dataCliente.telefono = this.formDataPerson.value.telefono;
    this.data.dataCliente.email = this.formDataPerson.value.email;
    this.data.dataCliente.lingua = this.formDataPerson.value.lingua;
    this.data.dataCliente.paese_di_domicilio = this.data.paese_di_domicilio;
    
    for (let i = 0; i<this.data.persons.length; i++){
      this.data.persons[i].cognome = this.formDataPerson.value.persons[i].cognome;
    }
    
    this.service.setGlobalData(this.data);
    this.http.saveDataToDb(this.data).subscribe(
      response => {
        if(response['success'] == 'true'){
          this.data.id_offerta = response['id_offerta'];
          this.service.setGlobalData(this.data);
          this.http.sendMail(this.data.id_offerta).subscribe(
            response =>{
              if(response['result'] == true){
                alert(response['message']);
                localStorage.removeItem('session');
                localStorage.removeItem('data'); 
                //this.router.navigate(['rechner/step-1']);
                window.location.href='https://onezone.ch/app/';
              }
              else{
                alert(response['message']);
              }
            },
            error => alert("error subscirbe email")
          );
          
        }
        else{
          alert(response['message']);
        }
      },
      error => alert("error subscribe")
    );

  }


  backStep(){
    this.router.navigate(['rechner/step-4']);
  }


}
