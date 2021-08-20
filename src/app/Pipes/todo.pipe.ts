import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../Interfaces/todo';

@Pipe({
  name: 'todo'
})
export class TodoPipe implements PipeTransform {

  transform(value: Todo): string {
    return `${value.id}: ${value.title}`;
  }

}
