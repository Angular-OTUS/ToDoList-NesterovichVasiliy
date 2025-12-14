import { Component, input } from '@angular/core'
import { ToDoTask } from '../../types'
import { ButtonComponent } from '../button/button'

@Component({
  selector: 'to-do-list-item',
  imports: [ButtonComponent],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItem {
  readonly task = input.required<ToDoTask>()
  readonly onDeleteCallback = input.required<(id: number) => void>()
  readonly isSelected = input<boolean>(false)

  onDelete(): void {
    this.onDeleteCallback()(this.task().id)
  }
}
