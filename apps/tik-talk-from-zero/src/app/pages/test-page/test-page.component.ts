import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@tt/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InnerComponent } from './inner/inner.component';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, RouterModule, InnerComponent],
  template: `
    <p>test works!</p>
    <p>Counter in outer: {{ counter }}</p>
    <button (click)="increase()">Increase</button>
    <app-inner [count]="counter" />
  `,
  styleUrl: './test-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPageComponent {
  public readonly authService = inject(AuthService);

  public counter = 20;

  increase() {
    this.counter++;
  }
}
