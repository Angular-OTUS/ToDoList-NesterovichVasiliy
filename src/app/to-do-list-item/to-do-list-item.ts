import { Component, Input } from '@angular/core';
import { ToDoTask } from '../types';

@Component({
  selector: 'to-do-list-item',
  imports: [],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItem {
  @Input({ required: true }) task!: ToDoTask;
  @Input({ required: true }) onDeleteCallback!: (id: number) => void;

  onDelete() {
    this.onDeleteCallback(this.task.id);
  }
}
