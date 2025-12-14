import { Component, computed, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToDoTask } from '../../types';
import { ButtonComponent } from '../button/button';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';

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
  imports: [ToDoListItem, MatInputModule, MatProgressSpinnerModule, ButtonComponent],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {
  readonly tasks = signal(DEFAULT_TASKS);
  readonly inputText = signal('');
  readonly isLoading = signal(true);
  inputDisabled = computed(() => this.inputText() === '');

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  onInputChange(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    if (text !== this.inputText()) {
      this.inputText.set(text);
    }
  }

  onAdd(): void {
    const id = Math.max(...this.tasks().map((x) => x.id)) + 1;
    const text = this.inputText();
    this.tasks.set([...this.tasks(), { id, text }]);
    this.inputText.set('');
  }

  onDelete(id: number): void {
    this.tasks.set(this.tasks().filter((x) => x.id !== id));
  }
}
