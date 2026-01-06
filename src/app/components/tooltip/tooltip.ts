import { Component, input } from '@angular/core'

@Component({
  selector: 'tooltip',
  imports: [],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class TooltipComponent {
  text = input('')
  left = input(0)
  top = input(0)
}
