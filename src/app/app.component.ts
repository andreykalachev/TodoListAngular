import { Component } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedService } from './services/shared-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RegistrationApp';

  IsUserLoggedIn: boolean = false;
  userName: string = "";

  constructor(private authService: AuthenticationService,  private cookieService: CookieService, private router: Router,
              private _sharedService: SharedService) {
    _sharedService.changeEmitted$.subscribe(event => this.onAuthSuccessful());
  }

  ngOnInit(){
    if (this.cookieService.get( 'Authorization') != '') {
      this.router.navigate(['/todoList']);
      this.IsUserLoggedIn = true;
      this.loadUserName();
    }
  }

  logout() {
    this.cookieService.delete( 'Authorization');
    this.IsUserLoggedIn = false;
    this.userName = "";
    this.router.navigate(['']);
  }

  login(){
    this.router.navigate(['/login']);
  }

  registration(){
    this.router.navigate(['/registration']);
  }

  onAuthSuccessful(){
    this.IsUserLoggedIn = true;
    this.loadUserName();
  }

  private loadUserName(){
    this.authService.getUserName().subscribe(name => {
      this.userName = name
    },
      error => {this.logout();});
  }
}
