import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService } from 'src/app/services/http.service';
import { isNumber } from 'util';
import { Offert } from 'src/app/classes/Offert';

@Component({
  selector: 'app-view-offert',
  templateUrl: './view-offert.component.html',
  styleUrls: ['./view-offert.component.css']
})
export class ViewOffertComponent implements OnInit {

  id;

  offerta: Offert;
  totale = 0.00;

  constructor(
    private router: Router,
    private http: HttpClientService,
    private activateRoute: ActivatedRoute
  ) {
   
   }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params => {
         this.http.getOffertbyid(params.id).subscribe(
           response => {
              this.offerta = response['offert'];
              this.getTotale();
              console.log(this.offerta);
           },
           error => {
              alert("error getOffertbyid: " + error.message);
           }
         );
      }
    );

    this.http.getOfferts().subscribe(
      response => {
        //alert(response);
      },
      error => {
        alert("error getOfferts(): " + error.message);
      }
    );
  }

  getTotale(){
     
    this.offerta['base'].forEach(base => {

      this.totale += parseFloat(base['totale_persona']);

    });

    console.log("Totale: "+ this.totale);
  }



  checkBenefits(persona){
    if(persona['benefits'] == null || persona['benefits'] == undefined){
      return false;
    }
    return true;

  }
  
}
