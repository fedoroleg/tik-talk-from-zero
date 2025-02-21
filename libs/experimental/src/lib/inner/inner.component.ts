import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-inner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inner.component.html',
  styleUrl: './inner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerComponent {
  @Input() text!: { name: string; address: { city: string } };
  @Input() timeout!: string;

  cdr = inject(ChangeDetectorRef);

  oleg = 'Oleg';
  count = Math.random();

  timer$ = timer(0, 1000);

  changeText() {
    this.oleg = 'Liza';
  }
}
