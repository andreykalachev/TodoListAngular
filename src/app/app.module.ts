import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';
import {RouterModule, Routes} from '@angular/router';
import { SharedService } from './services/shared-service';
import { ModifyTodoItemComponent } from './modify-todo-item/modify-todo-item.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'todoList', component: TodoListComponent},
  { path: 'todoList/add', component: AddTodoItemComponent},
  { path: 'todoList/update/:id', component: ModifyTodoItemComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListComponent,
    RegistrationComponent,
    AddTodoItemComponent,
    ModifyTodoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
