import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/http.service';
import { Data } from '../classes/Data';
import { Person } from '../classes/Person';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  myForm: FormGroup; 

  person : Person;

  data: Data;

  constructor(
    private service: DataService, 
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClientService){
    this.data = service.getData();
    this.person = this.data.persons[0];
}

  ngOnInit() {
    this.initOffer();
    this.myForm = this.fb.group({
      basics: this.fb.array([]),
      benefits: this.fb.array([])
    })
    
  }

  initForm(){
    let persons: Array<Person> = this.data.persons;
    let i = 0;

    let basics = persons[i]['basics'];
   
    for(let j=0; j<basics.length; j++){
      this.basicsForm.push(this.fb.group({
        title: [basics[j].title],
        code: [basics[j].code],
        title_poupop: [basics[j].title_poupop],
        descrizione_poupop: [basics[j].descrizione_poupop],
        selected: [basics[j].selected] 
      }));
    }

    let benefits = persons[i]['benefits'];
    console.log(benefits);
    for(let j=0; j<benefits.length; j++){
      this.benefitsForm.push(this.fb.group({
        title: [benefits[j].title],
        code: [benefits[j].code],
        title_poupop: [benefits[j].title_poupop],
        descrizione_poupop: [benefits[j].descrizione_poupop],
        selected: [benefits[j].selected],
        icon: [benefits[j].icon]
      }));
    }


   
  }

  initBasics(){

  }

  initBenefits(){
    
  }

  selectBasic(basic, i){
    let basics = this.myForm.value.basics;
    console.log(basics);
    for(let j=0; j< basics.length; j++){
      if(basics[j].code == basic.controls.code.value){
        basics[j].selected = "true";
      } 
      else{
        basics[j].selected = "false";
      }
    }
  }

  selectBenefit(benefit){
    let benefits = this.myForm.value.benefits;
    //console.log(benefits);
    for(let j=0; j< benefits.length; j++){
      if(benefits[j].code == benefit.controls.code.value){
        console.log("selected: " + benefit.controls.selected.value);
        if(benefit.controls.selected.value == "true"){
          benefits[j].selected = "false";
          benefit.controls.selected.value = "false";
        }
        else{
          benefits[j].selected = "true";
          benefit.controls.selected.value = "true";
        }
       
      } 
    }
  }

  

  isSelected(basic){
    if(basic.value.selected == "true"){
      return true;
    }
    else{
      return false;
    }
  }

  get basicsForm(){
    return this.myForm.get('basics') as FormArray;
  }

  get benefitsForm(){
    return this.myForm.get('benefits') as FormArray;
  }

  initOffer(){
    this.http.initOffer(this.data).subscribe(
      response => {
        if(response['success'] == 'true'){
          alert(response['data']);
          console.log(response['data']);
          this.data = response['data'];
          this.initForm();
        }
        else{
          alert(response['message']);
        }
      }
    );
  }

}
