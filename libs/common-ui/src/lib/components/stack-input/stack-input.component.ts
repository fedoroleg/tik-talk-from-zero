/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostListener,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stack-input',
  standalone: true,
  imports: [AsyncPipe, SvgIconComponent, FormsModule],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
})
export class StackInputComponent implements ControlValueAccessor {
  skills$ = new BehaviorSubject<string[] | null>(null);

  innerInput = '';

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.innerInput) return;

    if (this.skills$.value) {
      this.skills$.next([...this.skills$.value, this.innerInput]);
      this.innerInput = '';
      this.onChange(this.skills$.value);
    }
  }

  onTagDelete(i: number) {
    if (this.skills$.value) {
      this.skills$.next(
        this.skills$.value.slice(0, i).concat(this.skills$.value.slice(i + 1))
      );
      this.onChange(this.skills$.value);
    }
  }

  writeValue(skills: string[] | null): void {
    this.skills$.next(skills);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   console.log('setDisabledState non imlemented Oleg');
  // }

  onChange(skills: string[]) {}
  onTouched() {
    console.log('123');
  }
}
