import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-inner',
  standalone: true,
  imports: [],
  template: `
    <p>inner works!</p>
    <p>Count: {{count}}</p>
  `,
  styleUrl: './inner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnerComponent {
  @Input() count: number = 0
}
