import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, timer } from 'rxjs';
import { InnerComponent } from '../inner/inner.component';

@Component({
  selector: 'app-experimental',
  standalone: true,
  imports: [CommonModule, InnerComponent],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentalComponent {
  // public random$ = timer(0, 5000).pipe(map(() => Math.random()));
  text = {
    name: 'Здесь имя будет',
    address: {
      city: 'Питер',
    },
  };

  timeout = 'timeout'

  constructor() {
    setTimeout(() => {
      this.timeout = '+++++++++++';
    }, 1000);
  }

  onChangeText() {
    console.log('кликнул');
    this.text.name = 'новое имя';
    this.text.address.city = 'новое имя';
  }
}
