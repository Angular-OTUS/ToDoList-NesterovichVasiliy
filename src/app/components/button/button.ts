import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-component',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  @Input({ required: true }) title!: string;
}
