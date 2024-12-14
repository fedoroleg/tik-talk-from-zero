/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styleUrl: './svg-icon.component.scss',
})
export class SvgIconComponent {
  @Input() icon = '';
  get href() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
