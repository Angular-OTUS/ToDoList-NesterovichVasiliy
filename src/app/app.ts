import { Component, signal } from '@angular/core'
import { ToDoList } from './components/to-do-list/to-do-list'
import { ToastContainerComponent } from './components/toast-container/toast-container'

@Component({
  selector: 'app-root',
  imports: [ToDoList, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ToDoList-NesterovichVasiliy')
}
