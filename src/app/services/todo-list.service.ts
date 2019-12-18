import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {TodoItem} from '../entities/TodoItem';
import {map} from 'rxjs/operators';
import {TodoItemPostViewModel} from '../entities/ValueTypes/TodoItemPostViewModel';
import { Guid } from 'guid-typescript';
import { TodoItemUpdateViewModel } from '../entities/ValueTypes/TodoItemUpdateViewModel';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient,  private cookieService: CookieService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  getItemById(itemId: Guid){
    let headers = this.httpOptions.headers.append('Authorization', this.cookieService.get('Authorization'));
    return this.http.get('http://localhost:63289/TodoList/' + itemId, {headers}).pipe(map(
      data => {
        return data as TodoItem;
      },
      error => {
        return error as Response;
      }
      )
    );
  }

  getMyTodoList(): Observable<TodoItem[]> {
    let headers = this.httpOptions.headers.append('Authorization', this.cookieService.get('Authorization'));

    return this.http.get('http://localhost:63289/allMyTasks', {headers}).pipe(map(
      data => {
        return data as TodoItem[];
      },
      error => {
        return error as Response;
      }
      )
    );
  }

  delete(item: TodoItem){
    let headers = this.httpOptions.headers.append('Authorization', this.cookieService.get('Authorization'));
    return this.http.delete('http://localhost:63289/TodoList/' + item.id, {headers}).pipe(map(
      data => {
        return data;
      },
      error => {
        return error as Response;
      }
      )
    );
  }

  add(item: TodoItemPostViewModel): Observable<string>{
    let headers = this.httpOptions.headers.append('Authorization', this.cookieService.get('Authorization'));
    return this.http.post('http://localhost:63289/TodoList', item,  {headers}).pipe(map(
      data => {
        return data as string;
      },
      error => {
        return error as Response;
      }
      )
    );
  }

  put(updatedTodoItem: TodoItemUpdateViewModel): Observable<string> {
    let headers = this.httpOptions.headers.append('Authorization', this.cookieService.get('Authorization'));
    return this.http.put('http://localhost:63289/TodoList/', updatedTodoItem, {headers}).pipe(map(
      data => {
        return data as string;
      },
      error => {
        return error as string;
      }
      )
    );
  }

  markAsDone(item: TodoItem, isDone: boolean = true): Observable<TodoItem>{
    let headers = this.httpOptions.headers.append('Authorization', this.cookieService.get('Authorization'));
    return this.http.put('http://localhost:63289/TodoList/markAsDone/' + item.id, isDone, {headers}).pipe(map(
      data => {
        return data as TodoItem;
      },
      error => {
        return error as Response;
      }
      )
    );
  }
}
