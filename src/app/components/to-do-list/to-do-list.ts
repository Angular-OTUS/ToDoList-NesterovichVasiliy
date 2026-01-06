import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ShowTooltipDirective } from '../../directives'
import { ToDoListService } from '../../services/to-do-list.service'
import { ButtonComponent } from '../button/button'
import { ToDoListItem } from '../to-do-list-item/to-do-list-item'
import { ToastService } from '../../services/toast.service'

@Component({
  selector: 'to-do-list',
  imports: [
    ToDoListItem,
    MatInputModule,
    MatProgressSpinnerModule,
    ButtonComponent,
    ShowTooltipDirective,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {
  readonly service = inject(ToDoListService)
  readonly toastService = inject(ToastService)

  readonly inputText = signal('')
  readonly descriptionText = signal('')
  readonly inputDisabled = computed(() => this.inputText() === '')
  readonly isLoading = signal(true)
  readonly shouldShowEditor = computed(() => !!this.service.selectedItem())
  readonly editorInputText = signal('')
  readonly editorInputDisabled = computed(() => this.editorInputText() === '')

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false)
    }, 500)
  }

  onInputChange(event: Event): void {
    const text = (event.target as HTMLInputElement).value
    if (text !== this.inputText()) {
      this.inputText.set(text)
    }
  }

  onDescriptionChange(event: Event): void {
    const text = (event.target as HTMLInputElement).value
    if (text !== this.descriptionText()) {
      this.descriptionText.set(text)
    }
  }

  onEditorInputChange(event: Event): void {
    const text = (event.target as HTMLInputElement).value
    if (text !== this.editorInputText()) {
      this.editorInputText.set(text)
    }
  }

  onAdd(): void {
    const text = this.inputText()
    const description = this.descriptionText()
    this.service.add(text, description)
    this.toastService.showToast('Task added')
    this.clearInputs()
  }

  onUpdate(): void {
    const title = this.editorInputText()
    const { id, description } = this.service.selectedItem()!
    this.service.update(id, title, description)
    this.toastService.showToast('Task updated')
    this.clearInputs()
  }

  onDelete(id: number): void {
    this.service.delete(id)
    this.toastService.showToast('Task deleted')
  }

  selectItem(id: number): void {
    this.service.selectItem(id)
  }

  private clearInputs() {
    this.inputText.set('')
    this.descriptionText.set('')
    this.editorInputText.set('')
  }
}
