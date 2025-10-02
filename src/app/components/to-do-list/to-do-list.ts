import { Component, computed, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ToDoListItem } from '../../to-do-list-item/to-do-list-item';
import { ToDoTask } from '../../types';

const DEFAULT_TASKS: ToDoTask[] = [
  {
    id: 1,
    text: 'Buy a new gaming laptop',
  },
  {
    id: 2,
    text: 'Complete previous task',
  },
  {
    id: 3,
    text: 'Create some angular app',
  },
];

@Component({
  selector: 'to-do-list',
  imports: [ToDoListItem, MatInputModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList {
  tasks = signal<ToDoTask[]>(DEFAULT_TASKS);
  inputText = signal<string>('');
  inputDisabled = computed<boolean>(() => this.inputText() === '');

  onInputChange(event: Event) {
    const text = (event.target as HTMLInputElement).value;
    if (text !== this.inputText()) {
      this.inputText.set(text);
    }
  }

  onAdd() {
    const id = Math.max(...this.tasks().map((x) => x.id)) + 1;
    const text = this.inputText();
    this.tasks.set([...this.tasks(), { id, text }]);
    this.inputText.set('');
  }

  onDelete(id: number) {
    this.tasks.set(this.tasks().filter((x) => x.id !== id));
  }
}
