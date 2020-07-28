import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../classes/Data';
import { IOfferta } from '../interfaces/interface-offerta';


const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
    })
 };
 
@Injectable()
export class HttpClientService {
    private APIURL = "http://localhost/rechner_api/api/";
    private APIURL_PDF = "http://localhost/phpreport/src/";
    
    constructor(private http: HttpClient){

    }


    getPlz(plz: string){
        return this.http.get(this.APIURL+"plz.php?XDEBUG_SESSION_START=netbeans-xdebug&plz="+plz);
    }

    initOffer(data: Data){
        return this.http.post(this.APIURL+"init_offer.php?XDEBUG_SESSION_START=netbeans-xdebug" , { "data" : data}, httpOptions);
    }

    getOffer(data: Data){
       return this.http.post(this.APIURL+"get_offer.php?XDEBUG_SESSION_START=netbeans-xdebug",  { "data" : data}, httpOptions);
    }

    getOfferta (data: Data){
        return this.http.post<IOfferta[]>(this.APIURL+"get_offer.php?XDEBUG_SESSION_START=netbeans-xdebug",  { "data" : data}, httpOptions);
    }

    saveDataToDb(data: Data){
        return this.http.post(this.APIURL+"api_data.php?act=saveData&XDEBUG_SESSION_START=netbeans-xdebug",  { "data" : data}, httpOptions);
    }

    updateDataToDb(data: Data){
        return this.http.post(this.APIURL+"api_data.php?act=updateData&XDEBUG_SESSION_START=netbeans-xdebug",  { "data" : data}, httpOptions);
    }

    getPdf(id: number){
        return this.APIURL_PDF+"view_pdf.php?id="+id;
    }


}