import { Component, OnInit, Input, Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { Data, DataCliente } from '../classes/Data';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientService } from '../services/http.service';


@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

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
export class SelectedOfferComponent implements OnInit {

  data: Data;

  selectedOffert;

  formOffer: FormGroup;

  modelDataPicker: NgbDateStruct;
  today: {year: number, month: number, day: number}; 


  constructor( private http: HttpClientService,
               private service: DataService,
               private fb: FormBuilder,
               private router: Router,
               private ngbCalendar: NgbCalendar 
               ) { 
    
    
    this.today = this.ngbCalendar.getToday();
    this.data = service.getData();
    this.selectedOffert = this.data.selectedOffert;
    this.formOffer = fb.group({
      inizio_assicurazione: [ this.data.dataCliente.inizio_assicurazione, Validators.required]
    });
  }

  ngOnInit(): void {
    console.log (this.selectedOffert);
  }

  nextStep(){
    this.data.dataCliente.inizio_assicurazione = this.formOffer.value.inizio_assicurazione;

    this.service.setGlobalData(this.data);
    this.router.navigate(['selected-offer-step2']);
  }


  backStep(){
    this.router.navigate(['detail-offer']);
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
