import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  checkSession(){
    let session = localStorage.getItem('session');
    console.log(session);
    if(session != null){
      return true;
    }
    else{
      return false;
    }
  }
}
