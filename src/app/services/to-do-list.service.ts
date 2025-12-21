import { computed, Injectable, signal } from '@angular/core'
import { ToDoTask } from '../types'

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

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  private readonly _items = signal<ToDoTask[]>(DEFAULT_TASKS)
  private readonly selectedItemId = signal<number | null>(null)

  public readonly items = this._items.asReadonly()
  public readonly selectedItem = computed(() => {
    const id = this.selectedItemId()
    if (id === null) {
      return null
    }
    return this._items().find((task: ToDoTask) => task.id === id) || null
  })

  public add(text: string, description: string) {
    const id = Math.max(...this._items().map((x) => x.id)) + 1
    this._items.set([...this._items(), { id, text, description }])
  }

  public delete(id: number) {
    if (id === this.selectedItemId()) {
      this.selectedItemId.set(null)
    }

    this._items.update((items) => items.filter((item) => item.id !== id))
  }

  selectItem(id: number): void {
    if (id !== this.selectedItemId()) {
      this.selectedItemId.set(id)
    } else {
      this.selectedItemId.set(null)
    }
  }
}
