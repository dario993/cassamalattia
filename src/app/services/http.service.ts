import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpClientService {
    private APIURL = "http://localhost/rechner_api/api/";
    
    constructor(private http: HttpClient){

    }


    getPlz(plz: string){
        return this.http.get(this.APIURL+"plz.php?plz="+plz);
    }
}