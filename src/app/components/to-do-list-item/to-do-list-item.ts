import { Component, input, Input } from '@angular/core';
import { ToDoTask } from '../../types';
import { ButtonComponent } from "../button/button";

@Component({
  selector: 'to-do-list-item',
  imports: [ButtonComponent],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItem {
  @Input({ required: true }) task!: ToDoTask;
  @Input({ required: true }) onDeleteCallback!: (id: number) => void;
  
  isSelected = input<boolean>(false);

  onDelete() {
    this.onDeleteCallback(this.task.id);
  }
}
