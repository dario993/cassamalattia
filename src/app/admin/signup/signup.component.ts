import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp(form: NgForm){
    let result = this.auth.signUp(form.value.username, form.value.email, form.value.password);
    if(!result){
      alert("Errore");
      return;
    }
    this.router.navigate(['admin/login']);
  }

}
