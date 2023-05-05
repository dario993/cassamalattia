import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../classes/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isUserLoggedIn = false;
  username : string;

  constructor(private auth: AuthService, private router: Router) { 
    auth.usersignedin.subscribe(
      (user: User) => {
        this.username = user.username;
        this.isUserLoggedIn = true;
      }
    );

    auth.userlogout.subscribe(
      () => {
        this.username = '';
        this.isUserLoggedIn = false;
      }
    );

    auth.usersignedup.subscribe(
      (user: User) => {
        this.username = user.username;
        this.isUserLoggedIn = true;
      }
    );

  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
  }

  logout(e){
    e.preventDefault();
    this.auth.logOut();
    this.router.navigate(['admin/login']);
  }


  login(e){
    e.preventDefault();
    this.router.navigate(['admin/login']);
  }

  signup(e){
    e.preventDefault();
    this.router.navigate(['admin/signup']);
  }

}
