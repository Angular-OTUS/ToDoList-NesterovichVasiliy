import { Directive, HostListener, inject, input, Renderer2 } from '@angular/core'

@Directive({
  selector: '[showTooltip]',
})
export class ShowTooltipDirective {
  readonly taskDescription = input<string>('')
  readonly tooltipTarget = input<HTMLElement | null>(null)

  private readonly renderer = inject(Renderer2)

  @HostListener('mouseenter')
  onMouseEnter = (): void => {
    if (this.taskDescription()) {
      this.renderer.setProperty(this.tooltipTarget(), 'textContent', this.taskDescription())
    }
  }

  @HostListener('mouseleave')
  onMouseLeave = (): void => {
    this.renderer.setProperty(this.tooltipTarget(), 'textContent', '')
  }
}
