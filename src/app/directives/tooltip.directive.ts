import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[showTooltip]',
})
export class ShowTooltipDirective {
  @Input('showTooltip') taskDescription!: string;
  @Input() tooltipTarget!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.taskDescription) {
      this.renderer.setProperty(this.tooltipTarget, 'textContent', this.taskDescription);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setProperty(this.tooltipTarget, 'textContent', '');
  }
}
