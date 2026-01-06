import { Injectable, signal } from '@angular/core'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration: number
  autoClose: boolean
  createdAt: number
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<Toast[]>([])
  public readonly toasts = this._toasts.asReadonly()

  private readonly MAX_TOASTS = 5
  private readonly DEFAULT_DURATION = 5000

  showToast(
    message: string,
    type: ToastType = 'info',
    duration: number = this.DEFAULT_DURATION,
  ): string {
    const id = crypto.randomUUID()

    const newToast: Toast = {
      id,
      message,
      type,
      duration,
      autoClose: true,
      createdAt: Date.now(),
    }

    this._toasts.update((currentToasts) => {
      const updatedToasts = [...currentToasts, newToast]
      return updatedToasts.length > this.MAX_TOASTS ? updatedToasts.slice(1) : updatedToasts
    })

    return id
  }

  pauseToast(id: string): void {
    this._toasts.update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, autoClose: false } : toast)),
    )
  }

  resumeToast(id: string): void {
    this._toasts.update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, autoClose: true } : toast)),
    )
  }

  removeToast(id: string): void {
    this._toasts.update((toasts) => toasts.filter((t) => t.id !== id))
  }

  clearAll(): void {
    this._toasts.set([])
  }
}
