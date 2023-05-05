import { Component, OnInit, Input, Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { Data, DataCliente } from '../classes/Data';
import { FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientService } from '../services/http.service';
import { NgWizardStep } from '@cmdap/ng-wizard';
import { Person } from '../classes/Person';


@Injectable()
export class CustomAdapter extends NgbDateAdapter<string>  {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '.';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-selected-offer',
  templateUrl: './selected-offer.component.html',
  styleUrls: ['./selected-offer.component.css', '../app.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SelectedOfferComponent extends NgWizardStep implements OnInit {

  data: Data;

  selectedOffert;
  selectedOffertPersons;
  selectedPerson;

  myForm: FormGroup;

  modelDataPicker: NgbDateStruct;
  today: {year: number, month: number, day: number}; 


  constructor( private http: HttpClientService,
               private service: DataService,
               private fb: FormBuilder,
               private router: Router,
               private ngbCalendar: NgbCalendar 
               ) { 
    
    super();
    this.today = this.ngbCalendar.getToday();
    this.data = service.getData();
    this.selectedOffert = this.data.selectedOffert;
    this.selectedOffertPersons =  this.selectedOffert['persone'];
    this.setSelectedBenefits();   
  }



  checkBenefits(persona){
    console.log( 'benefitsexist: ' + persona['benefitsexist'] + ' listbenefitsleght: ' + persona['listbenefits'].length );
    if((persona['benefitsexist'] == false) && (persona['listbenefits'].length > 0)){
      return true;
    } 
    return false;

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

  ngOnInit(): void {
    console.log (this.selectedOffert);
    console.log (this.data);
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      persons: this.fb.array([])
    })
    this.initPersons();
  }

  initPersons(){
    let persons: Array<Person> = this.data.persons;

    //ciclo le persone
    for(let i=0; i<persons.length; i++){
      this.personForms.push(this.fb.group({
        benefits : this.fb.array([]),
        hospital: this.fb.array([])
      }));

      let benefits = persons[i]['benefits'];
      const benefitsForm = (<FormArray>this.myForm.controls['persons']).at(i).get('benefits') as FormArray;

      for(let j=0; j<benefits.length; j++){
          benefitsForm.push(this.fb.group({
          title: [benefits[j].title],
          code: [benefits[j].code],
          title_poupop: [benefits[j].title_poupop],
          descrizione_poupop: [benefits[j].descrizione_poupop],
          selected: [benefits[j].selected],
          icon: [benefits[j].icon]
        }));
      }

      let hospital = persons[i]['hospital'];
      const hospitalsForm = (<FormArray>this.myForm.controls['persons']).at(i).get('hospital') as FormArray;

      for(let j=0; j<hospital.length; j++){
        hospitalsForm.push(this.fb.group({
          title: [hospital[j].title],
          code: [hospital[j].code],
          title_poupop: [hospital[j].title_poupop],
          descrizione_poupop: [hospital[j].descrizione_poupop],
          selected: [hospital[j].selected],
          icon: [hospital[j].icon]
        }));
      }
    }
  }

  selectBenefit(benefit, nPersona){
    let benefits = this.myForm.value.persons[nPersona].benefits;

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



  changeHospital(level, nPersona){
   
    let hospital = this.myForm.value.persons[nPersona].hospital;

    for(let j=0; j< hospital.length; j++){
      if(hospital[j].code == level.controls.code.value){
        if(hospital[j].selected == "true"){
          hospital[j].selected = "false";
          level.controls.selected.value = "false";
        }
        else{
          hospital[j].selected = "true";
          level.controls.selected.value = "true";
        }
      }
      else{
        hospital[j].selected = "false";
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

  get personForms(){
    return this.myForm.get('persons') as FormArray;
  }


  nextStep(){
    //this.data.dataCliente.inizio_assicurazione = this.formOffer.value.inizio_assicurazione;

    //this.service.setGlobalData(this.data);

    for(let i = 0; i < this.myForm.value.persons.length; i++){
      this.data.persons[i].benefits = this.myForm.value.persons[i].benefits;
    }
    this.service.setDataPersons(this.data.persons);
    this.router.navigate(['rechner/step-5']);
  }


  backStep(){
    this.router.navigate(['rechner/step-3']);
  }

  reportOffert(){
    if(this.data.id_offerta > 0){
      this.http.updateDataToDb(this.data).subscribe(
        response => { 
          if(response['success'] == 'true'){
            //da caricare pagina php pdf
          }
          else{
            alert(response['message']);
          }
        }
      );
    }
    if(this.data.id_offerta == 0){
      this.http.saveDataToDb(this.data).subscribe(
        response => { 
          if(response['success'] == 'true'){

            //aggiornare data id
            //da caricare pagina php pdf

          }
          else{
            alert(response['message']);
          }
        }
      );
    }
  }



}
