import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/http.service';
import { DataService } from 'src/app/services/data.service';
import { Offert } from 'src/app/classes/Offert';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-offerts',
  templateUrl: './offerts.component.html',
  styleUrls: ['./offerts.component.css']
})
export class OffertsComponent implements OnInit {
 
  page = 1;
  pageSize = 20;
  collectionSize: number;
  currentRate = 8;
  offerts: Offert[];
  allOfferts: Offert[]; 

  constructor(
    
    private router: Router,
    private http: HttpClientService) { }

  ngOnInit(): void {
    this.http.getOfferts().subscribe(
      response => {
        this.collectionSize = response['offerts'].length;
        this.offerts = response['offerts'];
        this.allOfferts = this.offerts;
      },
      error => {
        alert("error getOfferts(): " + error.message);
      }
    );
  }


  showOfferDetail(offert: Offert){

    this.router.navigate(['admin/offert', offert.id_offerta_ricevuta]);

     
  }

}
