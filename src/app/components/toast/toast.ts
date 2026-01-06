import { Component, input, output } from '@angular/core'
import { Toast } from '../../services/toast.service'

@Component({
  selector: 'toast',
  standalone: true,
  templateUrl: 'toast.html',
  styleUrl: 'toast.scss',
})
export class ToastComponent {
  toast = input.required<Toast>()
  pauseEvent = output<string>()
  resumeEvent = output<string>()
  closeEvent = output<string>()
}
