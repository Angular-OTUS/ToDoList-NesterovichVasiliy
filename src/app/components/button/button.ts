import { Component, input } from '@angular/core'

@Component({
  selector: 'button-component',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  readonly title = input.required<string>()
  readonly disabled = input(false)
}
