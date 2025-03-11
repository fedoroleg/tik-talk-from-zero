import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  debounce,
  debounceTime,
  delay,
  fromEvent,
  map,
  Observable,
  OperatorFunction,
  Subscriber,
  Subscription,
  take,
  tap,
  timer,
} from 'rxjs';
import { InnerComponent } from '../inner/inner.component';

@Component({
  selector: 'app-experimental',
  standalone: true,
  imports: [CommonModule, InnerComponent],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperimentalComponent {
  sub!: Subscription;

  constructor() {
    timer(0, 1000).pipe(
      take(3),
      tap(val => console.log(val)),
      customMap((val) => 'Такое вот!' + val * 3)
    )
    .subscribe(val => {console.log('результат: ', val)})
  }

  stopSubs() {
    this.sub.unsubscribe();
  }
}

function customMap<T, R>(
  fn: (val: T) => R
): OperatorFunction<T, R> {
  return (source: Observable<T>) =>
    new Observable<R>((subscriber) => {
      return source.subscribe({
        next: (val) => {
          subscriber.next(fn(val));
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
}
