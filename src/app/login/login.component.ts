import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Login} from '../entities/Login';
import { TodoItem } from '../entities/TodoItem';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { SharedService } from '../services/shared-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService,  private cookieService: CookieService, private router: Router,
              private _sharedService: SharedService) { }

  email: string;
  password: string;
  isFormValid: boolean = false;

  ngOnInit() {
    document.getElementById('email').focus();
  }

  login() {
    let loginData = new Login(this.email, this.password);
    this.authService.login(loginData).subscribe(data => {
      this.cookieService.set( 'Authorization', 'Bearer ' + data );
        this._sharedService.authSuccessful();
      this.router.navigate(['/todoList']);
    },
    error => console.log('oops', error));
  }

  cancel() {
    this.router.navigate(['']);
  }

  CheckValidity(){
    if (this.email == '' || this.password == '') {
      this.isFormValid = false;
    }
    else this.isFormValid = true;
  }
}
