import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../classes/Data';
import { DataService } from '../services/data.service';
import { HttpClientService } from '../services/http.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, catchError, filter} from 'rxjs/operators';



@Component({
  selector: 'app-personal-details2',
  templateUrl: './personal-details2.component.html',
  styleUrls: ['./personal-details2.component.css']
})
export class PersonalDetails2Component implements OnInit {

  myForm: FormGroup;

  data: Data;

  constructor(private service: DataService, 
              private fb: FormBuilder, 
              private router: Router,
              private http: HttpClientService){
    this.data = service.getData();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      plz_localita: [this.data.plz_localita, [Validators.required]],
      paese_di_domicilio:  [this.data.paese_di_domicilio, [Validators.required]]
    })
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      filter( (str: string) => str.length>3 ),
      debounceTime(200),
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
