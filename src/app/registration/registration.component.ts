import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Inject} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import { Role } from '../entities/Role';
import {RegistrationViewModel} from '../entities/ValueTypes/RegistrationViewModel';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared-service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../app.component.css', './registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthenticationService, private cookieService: CookieService, private router: Router,
              private _sharedService: SharedService) { }

  availableRolesForRegistrations: Role[];

  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  isFormValid: boolean = false;
  userRole: Role;

  ngOnInit() {
    this.authService.getRolesForRegistration().subscribe(roles => this.availableRolesForRegistrations = roles)
      .add(roles =>this.userRole = this.availableRolesForRegistrations.find(x => x.name == "User"));
    document.getElementById('name').focus();
  }

  register() {
    let registrationData = new RegistrationViewModel(this.name, this.email, this.password, this.repeatPassword, this.userRole);

    this.authService.register(registrationData).subscribe(data => {
        this.cookieService.set( 'Authorization', 'Bearer ' + data );
        this._sharedService.authSuccessful();
        this.router.navigate(['/todoList']);
      },
      error => console.log('oops', error));
  }

  CheckValidity(){
    if (this.name == '' || this.email == '' || this.password == null || this.repeatPassword == null || this.password != this.repeatPassword
    || !this.validateEmail(this.email)) {
      this.isFormValid = false;
    }
    else this.isFormValid = true;
  }

  private validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  cancel() {
    this.router.navigate(['']);
  }
}
