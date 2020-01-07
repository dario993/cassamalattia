import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/http.service';
import { Data } from '../classes/Data';
import { Person } from '../classes/Person';


@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.css']
})
export class DetailOfferComponent implements OnInit {


  myForm: FormGroup; 

  person : Person;

  data: Data;

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
    this.resetForm();
    
    this.http.getOffer(this.data).subscribe(
      response => {
        if(response['success'] == 'true'){
          //alert(response['data']);
          //console.log(response['data']);
          this.data = response['data'];
          this.initForm();
        }
        else{
          alert(response['message']);
        }
      }
    );
  }


  resetForm(){
    this.myForm = this.fb.group({
      
    });
  }

  initForm(){
    console.log(this.data);
  }

  getOffert(){
    
  }

}
