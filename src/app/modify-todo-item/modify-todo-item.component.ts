import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoItem} from '../entities/TodoItem';
import {TodoListService} from '../services/todo-list.service';
import { Guid } from 'guid-typescript';
import {TodoItemPostViewModel} from '../entities/ValueTypes/TodoItemPostViewModel';
import {CookieService} from 'ngx-cookie-service';
import { TodoItemUpdateViewModel } from '../entities/ValueTypes/TodoItemUpdateViewModel';

@Component({
  selector: 'app-modify-todo-item',
  templateUrl: './modify-todo-item.component.html',
  styleUrls: ['../app.component.css', './modify-todo-item.component.css']
})
export class ModifyTodoItemComponent implements OnInit {

  constructor(private todoListService: TodoListService, private route:ActivatedRoute, private router: Router) {

  }

  item: TodoItemUpdateViewModel;
  title: string;
  description: string;
  id: Guid;
  isFormValid: boolean = true;

  ngOnInit() {
    this.id = Guid.parse(this.route.snapshot.paramMap.get('id'));
    this.todoListService.getItemById(this.id).subscribe(data => {
      this.item = data;
      this.title = data.title;
      this.description = data.description;
    })

  }

  update() {
    this.item.title = this.title;
    this.item.description = this.description;
    this.todoListService.put(this.item).subscribe(data => {
        this.router.navigate(['/todoList']);
      },
      error => {
        console.log(error)
      }
    );
  }

  cancel() {
    this.router.navigate(['/todoList']);
  }

  CheckValidity(){
    if (this.title == '' || this.description == '') {
      this.isFormValid = false;
    }
    else this.isFormValid = true;
  }
}
