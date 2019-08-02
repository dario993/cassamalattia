import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../classes/Data';
import { DataService } from '../services/data.service';
import { HttpClientService } from '../services/http.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, catchError} from 'rxjs/operators';


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-personal-details2',
  templateUrl: './personal-details2.component.html',
  styleUrls: ['./personal-details2.component.css']
})
export class PersonalDetails2Component implements OnInit {

  myForm: FormGroup;

  data: Data;

  public model: any;

  constructor(private service: DataService, 
              private fb: FormBuilder, 
              private router: Router,
              private http: HttpClientService){
    this.data = service.getData();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      plz_localita: [this.data.plz_localita, [Validators.required]],
      paese_di_domicilio:  [this.data.paese_di_domicilio]
    })
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      //switchMap
      switchMap( (searchText) =>  this.http.getPlz(searchText) )
              
    );
  }

  backStep(){
    this.router.navigate(['personal-details1']);
  }

  nextStep(){
    
    console.log("Next step!");
    
    this.service.setGlobalData(this.myForm.value);
    this.router.navigate(['offer']);
    
  }

}
