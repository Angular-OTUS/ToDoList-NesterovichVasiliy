import { Component, OnInit, OnDestroy, inject } from '@angular/core'
import { ToastComponent } from '../toast/toast'
import { ToastService } from '../../services/toast.service'

@Component({
  selector: 'toast-container',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: 'toast-container.html',
  styleUrl: 'toast-container.scss',
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  private timeouts = new Map<string, number>()
  toastService = inject(ToastService)

  ngOnInit(): void {
    this.setupTimeouts()
  }

  private setupTimeouts(): void {
    this.toastService.toasts().forEach((toast) => {
      if (toast.autoClose && !this.timeouts.has(toast.id)) {
        const timeoutId = window.setTimeout(
          () => this.toastService.removeToast(toast.id),
          toast.duration,
        )
        this.timeouts.set(toast.id, timeoutId)
      }
    })
  }

  onPause(id: string): void {
    const timeoutId = this.timeouts.get(id)
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      this.timeouts.delete(id)
    }
    this.toastService.pauseToast(id)
  }

  onResume(id: string): void {
    const toast = this.toastService.toasts().find((t) => t.id === id)
    if (toast && !toast.autoClose) {
      const remaining = Math.max(0, toast.duration - (Date.now() - toast.createdAt))
      const timeoutId = window.setTimeout(() => this.toastService.removeToast(id), remaining)
      this.timeouts.set(id, timeoutId)
      this.toastService.resumeToast(id)
    }
  }

  onClose(id: string): void {
    const timeoutId = this.timeouts.get(id)
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      this.timeouts.delete(id)
    }
    this.toastService.removeToast(id)
  }

  ngOnDestroy(): void {
    this.timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId))
    this.timeouts.clear()
  }
}
