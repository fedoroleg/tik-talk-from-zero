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
  @Input({transform: multiply}) count: number = 0
}

function multiply(value: number) {
  console.log('multiply run');
  
  return value * 1000
}
