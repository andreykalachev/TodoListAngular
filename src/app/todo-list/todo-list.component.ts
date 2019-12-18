import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {CookieService} from 'ngx-cookie-service';
import {TodoListService} from '../services/todo-list.service';
import {TodoItem} from '../entities/TodoItem';
import {error} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoItems: TodoItem[];

  constructor(private todoListService: TodoListService, private router: Router) { }

  ngOnInit() {
    this.loadTodoList();
  }

  loadTodoList() {
    this.todoListService.getMyTodoList()
      .subscribe((data: TodoItem[]) => this.todoItems = data,
        (error : Response)  => {
          if (error.status == 401) alert("You need to login successfully first");
        });
  }

  addNewItem() {
    this.router.navigate(['/todoList/add']);
  }

  delete(item: TodoItem) {
    this.todoListService.delete(item).subscribe(data => {
        this.removeItemFromListLocally(item);
      },
      (error : Response) => alert("Item has not been deleted, sorry"));
  }

  toggleDone(item: TodoItem){
    if (!item.isDone){
      this.markAsDone(item);
    }
    else{
      this.markAsDone(item, false);
    }
  }

  markAsDone(item: TodoItem, isDone: boolean = true) {
    this.todoListService.markAsDone(item, isDone).subscribe(data => {
        item.isDone = data.isDone;
        item.dateDone = data.dateDone;
      },
      (error : Response) => {
      document.getElementById(item.id.toString())[0].cheacked = !isDone;
      alert("opps, something's gone wrong");
      });
  }

  private removeItemFromListLocally(item: TodoItem){
    const index = this.todoItems.indexOf(item, 0);
    if (index > -1) {
      this.todoItems.splice(index, 1);
    }
  }

  modify(item: TodoItem) {
    this.router.navigate(['/todoList/update/'+item.id]);
  }
}
