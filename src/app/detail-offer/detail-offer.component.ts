import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/http.service';
import { Data } from '../classes/Data';
import { IOfferta } from '../interfaces/interface-offerta';
import { NgWizardStep } from '@cmdap/ng-wizard';


@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.css']
})
export class DetailOfferComponent extends NgWizardStep implements OnInit {
 

  data: Data;
 
  results: any;

  resultsBenefits: any = new Array();

  resultsBase: any = new Array();

  isCollapsedSupp: boolean[] = new Array();

  selectedPerson: number;

  constructor(
    private service: DataService, 
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClientService){
      super();
      this.selectedPerson = 0;
      this.data = service.getData();
     
}


  ngOnInit() {
    
     this.http.getOfferta(this.data)
     .subscribe(
      response => {
          if(response['success'] == "true"){
            this.results = response['data'] ;
            this.divideResult();
            //this.setCollapse();
            //this.ordinaRisultati();
            //console.log(response)
          }
          else{
            console.log(response['message']);
            alert(response['message']);
          }
         },
      error => {
        alert("Errore! Contattare il webmaster");
      } 
     );
  }

  divideResult(){
    this.results.forEach(row => {
        if(row['persone'][0].benefitsexist == true){
          this.resultsBenefits.push(row);
        }      
        else{
          this.resultsBase.push(row);
        }
    });
    this.ordinaRisultati(this.resultsBenefits);
    this.ordinaRisultati(this.resultsBase);
  }

  
  
  

  ordinaRisultati(array){
    array.sort(function(a, b){
       return parseFloat(a['totale']) - parseFloat(b['totale']);
    })
  }

  nextStep(row){
    
    console.log(row);


    this.service.setSelectedOffert(row);
    this.service.setDataPersons(this.data.persons);
    this.service.setOffertData(this.data.offert);
    this.router.navigate(['rechner/step-4']);
    
  }

  goStep1(){
    this.router.navigate(['rechner/step-1']);
  }

}
