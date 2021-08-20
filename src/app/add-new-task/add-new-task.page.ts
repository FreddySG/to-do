import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { Todo } from '../Interfaces/todo';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  name: string;
  todos: Todo[];
  todo: Todo;

  categories = []
  categorySelectedCategory

  newTaskObj = {}
  itemName
  itemPriority
  itemDueDate
  itemCategory

  constructor(private modalCtrl: ModalController, private todoService: TodoService) {
    this.todo = {
      id: 1,
      title: 'Comprar manzanas',
      active: true,
      prioridad: 'baja',
    };
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    });
  }

  

  async dismis(){
    await this.modalCtrl.dismiss(this.newTaskObj)

  }


  selectedCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async add(){
    this.newTaskObj = ({itemName:this.itemName,
                        itemDueDate:this.itemDueDate,
                        itemPriority:this.itemPriority,
                        itemCategory:this.itemCategory});
    console.log(this.newTaskObj);
    let uid = this.itemName + this.itemDueDate

    if(uid){
      await this.todoService.addTask(uid,this.newTaskObj)
    }else{
      console.log("can´t save empty task");
    }

    this.dismis()
  }

}
