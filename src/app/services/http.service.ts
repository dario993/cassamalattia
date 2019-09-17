import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../classes/Data';

const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
    })
 };
 
@Injectable()
export class HttpClientService {
    private APIURL = "http://localhost/rechner_api/api/";
    
    constructor(private http: HttpClient){

    }


    getPlz(plz: string){
        return this.http.get(this.APIURL+"plz.php?plz="+plz);
    }

    initOffer(data: Data){
        return this.http.post(this.APIURL+"offer.php?XDEBUG_SESSION_START=netbeans-xdebug" , { "data" : data}, httpOptions);
    }
}