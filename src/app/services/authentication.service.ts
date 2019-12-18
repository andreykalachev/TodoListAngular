import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Login} from '../entities/Login';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TodoItem } from '../entities/TodoItem';
import {CookieService} from 'ngx-cookie-service';
import {RegistrationViewModel} from '../entities/ValueTypes/RegistrationViewModel';
import {Role} from '../entities/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,  private cookieService: CookieService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  login(login: Login): Observable<string> {
    return this.http.post('http://localhost:63289/login', login, this.httpOptions).pipe(map(
        data => {
          return data as string;
        },
        error => {
        return error as string;
        }
      )
    );
  }

  register(registrationData: RegistrationViewModel): Observable<string> {
    return this.http.post('http://localhost:63289/register', registrationData, this.httpOptions).pipe(map(
      data => {
        return data as string;
      },
      error => {
        return error as string;
      }
      )
    );
  }

  getRolesForRegistration(): Observable<Role[]> {
    return this.http.get('http://localhost:63289/register', this.httpOptions).pipe(map(
      data => {
        return data as Role[];
      },
      error => {
        return error as Response;
      }
      )
    );
  }

  getUserName(): Observable<string> {
    let headers = this.httpOptions.headers.append('Authorization', this.cookieService.get('Authorization'));
    return this.http.get('http://localhost:63289/getUserName', {headers}).pipe(map(
      data => {
        return data as string;
      },
      error => {
        return error as Response;
      }
      )
    );
  }
}
