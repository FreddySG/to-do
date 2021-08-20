import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs';
import { Todo } from './Interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'https://demo6193376.mockable.io/todos';
  todos: Subject<Todo[]>;
  todosArray: Todo[] = [];

  constructor(private storage: Storage, private http: HttpClient){
    this.todos = new Subject();
    this.todos.next(this.todosArray);
    this.initTodos();

    this.init()
  }

  getTodos(): Observable<Todo[]> {
    return this.todos;
  }

  initTodos() {
    (this.http.get(this.url) as Observable<Todo[]>)
      .toPromise()
      .then((value) => {
        console.log({ value });
        this.todosArray = value;
        this.todos.next(value);
      });
  }

  createTodo(todo: Todo) {
    this.todosArray.push(todo);
    console.log(this.todosArray);
    this.todos.next(this.todosArray);
  }

  addTask(key, value){
    this.storage.set(key,value)

  }

  deleteTask(key){
    this.storage.remove(key);
  }

  updateTask(key, newValue){
    this.storage.set(key, newValue)
    this.getAllTasks()

  }

  getAllTasks(){
    let task: any = []
    this.storage.forEach((key, value, index) => {
    task.push({'key':value,'value':key})
    });
    return task
  }

  async init(){
    await this.storage.create()
  }
}
