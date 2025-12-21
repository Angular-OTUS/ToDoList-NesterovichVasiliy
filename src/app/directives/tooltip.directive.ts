import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  ViewContainerRef,
} from '@angular/core'
import { TooltipComponent } from '../components/tooltip/tooltip'

@Directive({
  selector: '[showTooltip]',
})
export class ShowTooltipDirective {
  readonly taskDescription = input<string>('')

  private viewContainerRef = inject(ViewContainerRef)
  private elementRef = inject(ElementRef)

  private isTooltipVisible = signal(false)
  private tooltipRef: ComponentRef<TooltipComponent> | null = null

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isTooltipVisible.set(true)
    this.renderTooltip()
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isTooltipVisible.set(false)
    this.removeTooltip()
  }

  private renderTooltip(): void {
    if (!this.isTooltipVisible() || this.tooltipRef) return

    this.tooltipRef = this.viewContainerRef.createComponent(TooltipComponent)

    this.tooltipRef.setInput('text', this.taskDescription())

    this.updatePosition()
  }

  private updatePosition(): void {
    if (!this.tooltipRef) return

    const hostRect = this.elementRef.nativeElement.getBoundingClientRect()
    const scrollY = window.scrollY
    const scrollX = window.scrollX

    const top = hostRect.bottom + scrollY + 5
    const left = hostRect.left + scrollX

    this.tooltipRef.setInput('top', Math.round(top))
    this.tooltipRef.setInput('left', Math.round(left))

    this.tooltipRef.changeDetectorRef.detectChanges()
  }

  private removeTooltip(): void {
    if (this.tooltipRef) {
      this.tooltipRef.destroy()
      this.tooltipRef = null
    }
  }
}
