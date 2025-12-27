import { Component, computed, signal, OnInit } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ShowTooltipDirective } from '../../directives'
import { ToDoTask } from '../../types'
import { ButtonComponent } from '../button/button'
import { ToDoListItem } from '../to-do-list-item/to-do-list-item'

const DEFAULT_TASKS: ToDoTask[] = [
  {
    id: 1,
    text: 'Buy a new gaming laptop',
    description: `Необходимо приобрести новый игровой ноутбук для работы с требовательными приложениями и современными играми.
     Основные требования: процессор Core i7/i9 или Ryzen 7/9, видеокарта RTX 4070 или выше, минимум 32GB оперативной памяти,
      SSD 1TB, качественный дисплей с высокой частотой обновления. Бюджет до 2500$. Рассмотреть модели ASUS ROG, Lenovo Legion и MSI.`,
  },
  {
    id: 2,
    text: 'Complete previous task',
    description: `Важно завершить все предыдущие задачи перед началом новых. Составить список незавершенных дел, определить
     приоритеты выполнения, выделить время на каждую задачу. Провести анализ причин задержек и разработать стратегию для более
      эффективного выполнения задач в будущем. Составить отчет о выполнении.`,
  },
  {
    id: 3,
    text: 'Create some angular app',
    description: `Разработать Angular приложение с использованием последней версии фреймворка. Архитектура должна включать
     модульную структуру, lazy loading, reactive forms, Angular Material для UI компонентов. Реализовать функционал управления 
     задачами: создание, редактирование, удаление, фильтрация. Добавить поддержку темной темы и локализации. Использовать RxJS 
     для управления состоянием и HttpClient для работы с API.`,
  },
]

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
  tasks = signal(DEFAULT_TASKS)
  inputText = signal('')
  descriptionText = signal('')
  inputDisabled = computed(() => this.inputText() === '')
  isLoading = signal(true)
  selectedItemId = signal<number | null>(null)

  selectedItem = computed(() => {
    const id = this.selectedItemId()
    if (id === null) {
      return null
    }
    return this.tasks().find((task: ToDoTask) => task.id === id) || null
  })

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

  onAdd(): void {
    const id = Math.max(...this.tasks().map((x) => x.id)) + 1
    const text = this.inputText()
    const description = this.descriptionText()
    this.tasks.set([...this.tasks(), { id, text, description }])
    this.inputText.set('')
    this.descriptionText.set('')
  }

  onDelete(id: number): void {
    this.tasks.set(this.tasks().filter((x) => x.id !== id))
  }

  selectItem(id: number): void {
    if (id !== this.selectedItemId()) {
      this.selectedItemId.set(id)
    } else {
      this.selectedItemId.set(null)
    }
  }
}
