import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/http.service';
import { Data } from '../classes/Data';
import { IOfferta } from '../interfaces/interface-offerta';


@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.css']
})
export class DetailOfferComponent implements OnInit {

 

  data: Data;
 
  results: Array<IOfferta>;

  isCollapsed: boolean[] = new Array();


  selectedPerson: number;

  constructor(
    private service: DataService, 
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClientService){
      this.selectedPerson = 0;
      this.data = service.getData();
     
}


  ngOnInit() {
    
     this.http.getOfferta(this.data)
     .subscribe(
      response => {
          if(response['success'] == "true"){
            this.results = response['data'] as IOfferta[];
            this.setCollapse();
            this.calcolaTotali();
            this.ordinaRisultati();
            //console.log(response)
          }
          else{
            console.log("error");
            alert(response['message']);
          }
         },
      error => alert("Errore! Contattare il webmaster")
     );

   
  }

  setCollapse(){
    for(let i=0; i < this.results.length; i++){
      this.isCollapsed.push(false);
    }
  }
  


  calcolaTotali(){
    this.results.forEach(row => {
        let totale = this.calcolaTotalePersona(row['persone']);
        row['totale'] = totale.toFixed(2);
    });
    console.log(this.results);
  }


  calcolaTotalePersona(persone){
    let totale: number = 0.00;
    persone.forEach(persona => {
        totale += parseFloat(persona['premio']);
        let totalePersona = parseFloat(persona['premio']);

        if(persona['benefits'] !== undefined){
           totale += parseFloat(persona['benefits']['totale']);
           totalePersona += parseFloat(persona['benefits']['totale']);    
        }

        persona['totale_persona'] = totalePersona.toFixed(2);
       
      });
    return totale;
  }

  ordinaRisultati(){
    this.results.sort(function(a, b){
       return parseFloat(a['totale']) - parseFloat(b['totale']);
    })
  }

}
