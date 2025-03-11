// import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { fromEvent, map, Observable, Subscriber, take, timer } from 'rxjs';
// import { InnerComponent } from '../inner/inner.component';

// interface Observer<T> {
//   next: (value: T) => void;
//   complete: () => void;
// }

// @Component({
//   selector: 'app-experimental',
//   standalone: true,
//   imports: [CommonModule, InnerComponent],
//   templateUrl: './experimental.component.html',
//   styleUrl: './experimental.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ExperimentalComponent {
//   constructor() {
//     customFromEvent(document.body, 'click')
//       .pipe(take(3))
//       .subscribe({ next: (evnt) => console.log(evnt) });
//   }
// }
// //subscriber - это объект, который будет передаваться в метод .subscribe({next, error, complete})

// function customFromEvent(el: HTMLElement, eventName: string) {
//   return new Observable((subscriber) => {
//     const handler = (event: Event) => {
//       return subscriber.next(event); // subscriber.next() - по сути и есть тот метод, который я передаю в.subscribe() при вызове
//     };
//     el.addEventListener(eventName, handler);

//     return () => {
//       console.log('complete unsubs');
//       el.removeEventListener(eventName, handler);
//     };
//   });
// }

// customFromEvent(document.body, 'click')
//   .subscribe({ next: (evnt) => console.log(evnt) });




// // самописный интервал rxjs
// @Component({
//   selector: 'app-experimental',
//   standalone: true,
//   imports: [CommonModule, InnerComponent],
//   templateUrl: './experimental.component.html',
//   styleUrl: './experimental.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ExperimentalComponent {
//   constructor() {
//     customTimer(1000)
//       .pipe(delay(2000), take(3))
//       .subscribe({ // это по сути вызов функции new Observable, код запускает ее
//         next: (val) => console.log(val),
//         complete: () => console.log('complete'),
//       });
//   }
// }

// // Когда мы пишем .subscribe у потока, то запускается вызов функции new Observable(...) => {}. 
// // Т. е. просто вызывается эта функция. 
// // А value, которое мы получаем в .subscribe(value => {}) - это то, что выдает метод next вунитри функции обзервабл.

// function customTimer(interval: number) {
//   return new Observable((subscriber) => {
//     console.log('run!');
//     let count = 0;
//     const int = setInterval(() => {
//       subscriber.next('count: ' + count);
//       console.log('iside interval: ' + count)
//       count++;
      
//     }, interval);

//     return () => {
//       clearInterval(int)
//       console.log('это ретерн из обзервабла, срабаывает при комплите')};
//   });
// }

// function customMap(): OperatorFunction<number, number> {
//   return (source: Observable<number>) => {
//     return new Observable<number>((subscriber: Subscriber<number>) => {
//       return source.subscribe({
//         next: (val) => {subscriber.next( val * 2)},
//         error: (error) => { return error},
//         complete: () => {console.log('complete')
//         },
//       })
//     })
//   }