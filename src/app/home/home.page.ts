import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';
import { Todo } from '../Interfaces/todo';
import { TodoPipe } from '../Pipes/todo.pipe';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  name: string;
  todos: Todo[];
  todo: Todo;

  todoList = [{
      itemName: 'Comprar manzanas',
      itemPriority: 'High',
      itemDueDate: '08-18-21'
    }
  ]

  today: number = Date.now();
  constructor(private modalCtrl: ModalController, private todoService: TodoService) {

  this.getAllTask()
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    });
  }


  async addNewItem(){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage,
    })

    modal.onDidDismiss().then(newTask =>{
      this.getAllTask()
    })

    return await modal.present()

  }

  getAllTask(){
    this.todoList = this.todoService.getAllTasks()
    console.log(this.todoService.getAllTasks());
  }

  delete(key){
    this.todoService.deleteTask(key)
    this.getAllTask()
  }


  async update(selectedTask){
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps:{task: selectedTask }

    })

    modal.onDidDismiss().then(()=>{
      this.getAllTask()
    })

    return await modal.present()
  }

}
