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

  selectedPerson: number;

  constructor(
    private service: DataService, 
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClientService){
      this.selectedPerson = 0;
      this.data = service.getData();
      this.getDataPerson(this.selectedPerson);     
  } 

  getDataPerson(p:number){
    this.person = this.data.persons[p];
  }

  ngOnInit() {
    this.initOffer();
   }

  initForm(){
    let level  = this.data.level_offert;

    for(let j=0; j<level.length; j++){
      this.levelForm.push(this.fb.group({
        title: [level[j]['title']],
        code: [level[j]['code']],
        descrizione_poupop: [level[j]['descrizione_poupop']],
        selected: [level[j]['selected']]
      }));
    }
    

    let persons: Array<Person> = this.data.persons;
    
    let basics = persons[0]['basics'];
    for(let j=0; j<basics.length; j++){
      this.basicsForm.push(this.fb.group({
        title: [basics[j].title],
        code: [basics[j].code],
        title_poupop: [basics[j].title_poupop],
        descrizione_poupop: [basics[j].descrizione_poupop],
        selected: [basics[j].selected] 
      }));
    }

    let benefits = persons[this.selectedPerson]['benefits'];
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
    if(this.selectedPerson !== 0){
      return false;
    }
    let basics = this.myForm.value.basics;
    for(let j=0; j< basics.length; j++){
      if(basics[j].code == basic.controls.code.value){
        //console.log("selected: " + basic.controls.selected.value);
        if(basic.controls.selected.value == "true"){
          basics[j].selected = "false";
          basic.controls.selected.value = "false";
        }
        else{
          basics[j].selected = "true";
          basic.controls.selected.value = "true";
        }
       
      } 
    }
  }

  selectBenefit(benefit){
    let benefits = this.myForm.value.benefits;
    for(let j=0; j< benefits.length; j++){
      if(benefits[j].code == benefit.controls.code.value){
        //console.log("selected: " + benefit.controls.selected.value);
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


  isDisabled(){
    if(this.selectedPerson !== 0){
      return true;
    }
    else{
      return false;
    }
  }

  fireEvent(e){
    console.log(e.type);
    e.preventDefault();
  }


  changeLevel(level){
    if(this.selectedPerson !== 0){
      return false;
    }

    let levels = this.myForm.value.level;

    for(let j=0; j< levels.length; j++){
      if(levels[j].code == level.controls.code.value){
          levels[j].selected = "true";
          level.controls.selected.value = "true";
      }
      else{
        levels[j].selected = "false";
        level.controls.selected.value = "false";
      }
    }
  }
    

  

  isSelected(select){
    if(select.value.selected == "true"){
      return true;
    }
    else{
      return false;
    }
  }

  get levelForm(){
    return this.myForm.get('level') as FormArray;
  }

  get basicsForm(){
    return this.myForm.get('basics') as FormArray;
  }

  get benefitsForm(){
    return this.myForm.get('benefits') as FormArray;
  }

  resetForm(){
    this.myForm = this.fb.group({
      level: this.fb.array([]),
      basics: this.fb.array([]),
      benefits: this.fb.array([])
    });
  }

  initOffer(){
    this.resetForm();
    this.http.initOffer(this.data).subscribe(
      response => {
        if(response['success'] == 'true'){
          //alert(response['data']);
          console.log(response['data']);
          this.data = response['data'];
          this.initForm();
        }
        else{
          alert(response['message']);
        }
      },
      error => alert("error subscribe")
    );
  }

  backStep(){
    if(this.selectedPerson > 0 ){
      this.selectedPerson--;
      this.getDataPerson(this.selectedPerson);
      this.resetForm();
      this.initForm();
    }
    else{
      this.router.navigate(['personal-details2']);
    }
    
  }

  nextStep(){
    
    this.data.level_offert = this.myForm.value.level;
    this.data.persons[0].basics = this.myForm.value.basics;
    this.data.persons[this.selectedPerson].benefits = this.myForm.value.benefits;
    console.log("total persons: " + this.data.persons.length);
    console.log("seleted persons: " + this.selectedPerson);
    
    if(this.data.persons.length-1 == this.selectedPerson){
      console.log(this.data);
      this.service.setGlobalData(this.data);
      //this.service.setDataPersons(this.data.persons);
      this.router.navigate(['detail-offer']);
    }
    else{
      this.selectedPerson++;
      this.getDataPerson(this.selectedPerson);
      this.resetForm();
      this.initForm();
    }
    
    
  }


}
