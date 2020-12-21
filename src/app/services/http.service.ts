import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../classes/Data';
import { IOfferta } from '../interfaces/interface-offerta';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
    })
 };
 
@Injectable()
export class HttpClientService {
    private APIURL = environment.APIURL ;
    private APIURL_PDF = environment.API_PDF;
    private lang;

    siteLanguage: string = 'English';
    siteLocale: string;
    languageList = [{ code: 'en', label: 'English' },
                    { code: 'fr', label: 'Français' },
                    { code: 'de', label: 'Deutsch' },
                    { code: 'it', label: 'Italian' }];

    
    constructor(private http: HttpClient, @Inject(LOCALE_ID) lang: string){
        this.siteLocale = 'it';
      

        if (environment.production == true) {
            this.siteLocale = window.location.pathname.split('/')[1];
            this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;
        }

    }


    getPlz(plz: string){
        return this.http.get(this.APIURL+"plz.php?XDEBUG_SESSION_START=netbeans-xdebug&plz="+plz);
    }

    initOffer(data: Data){
        return this.http.post(this.APIURL+"init_offer.php?XDEBUG_SESSION_START=netbeans-xdebug&lang="+this.siteLocale, { "data" : data}, httpOptions);
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
        return this.APIURL_PDF+"view_pdf.php?XDEBUG_SESSION_START=netbeans-xdebug&id="+id;
    }

    sendMail(id: number){
        return this.http.get(this.APIURL+"api_data.php?act=sendMail&XDEBUG_SESSION_START=netbeans-xdebug&lang="+this.siteLocale+"&id="+id);
    }



}