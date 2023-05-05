import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/User';
import { HttpClientService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogged = false;
  @Output() usersignedin = new EventEmitter<User>();
  @Output() usersignedup = new EventEmitter<User>();
  @Output() userlogout = new EventEmitter();

  constructor(private http: HttpClientService) { }

  signIn(email: string, password: string){
    this.http.login(email, password).subscribe(
      result => {
        if(result['message'] == 'ok'){
          
          let user = new User();
          user.username = result['username'];
          user.email = result['email'];
          this.usersignedin.emit(user);
          
          this.isUserLogged = true;
          localStorage.setItem('token', user.username);
        }
      },
      error => {
        alert("Nessun utente trovato");
        console.log("Login error: "+ error['message']);
      }
    );

   
    return true;
  }

  signUp(username: string, email: string, password: string){
    localStorage.setItem('token', email);

    let user = new User();
    user.username = username;
    user.email = email;
    this.usersignedup.emit(user);

    return true;
  }

  isUserLoggedIn(){
    this.isUserLogged = !!localStorage.getItem('token');
    console.log("Logged: " + this.isUserLogged);
    return  this.isUserLogged;
  }

  logOut(){
    localStorage.removeItem('token');
    this.userlogout.emit();
    this.isUserLogged = false;
  }

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
