import { Component, OnInit } from '@angular/core';
import {TodoListService} from '../services/todo-list.service';
import {TodoItemPostViewModel} from '../entities/ValueTypes/TodoItemPostViewModel';
import {error} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['../app.component.css', './add-todo-item.component.css']
})
export class AddTodoItemComponent implements OnInit {

  constructor(private todoListService: TodoListService, private router: Router) { }

  title: string;
  description: string;
  isFormValid: boolean = false;

  ngOnInit() {
    document.getElementById('title').focus();
  }

  add(){
    let todoItemPostData = new TodoItemPostViewModel(this.title, this.description)
    this.todoListService.add(todoItemPostData).subscribe(data => {
        this.router.navigate(['/todoList']);
        },
        error => {
        console.log(error)
        }
    );
  }

  cancel(){
    this.router.navigate(['/todoList']);
  }

  CheckValidity(){
    if (this.title == '' || this.description == '') {
      this.isFormValid = false;
    }
    else this.isFormValid = true;
  }

}
