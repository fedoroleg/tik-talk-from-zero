import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tt-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent),
    },
  ],
})
export class TtInputComponent implements ControlValueAccessor {
  @Input() type!: 'text' | 'password';
  @Input() placeholder!: string;

  onChange: any;
  onTouched: any;
  isDisabled = false;

  value: string | null = null;
  value$ = new BehaviorSubject<string | null>(null)

  ttInputControl = new FormControl()

  // этот метод нужен, чтобы модель отдала свое значение шаблону
  writeValue(val: string | null): void {
    console.log('writeValue in tt-input: ', val);
    
    this.value = val;
    this.value$.next(val)
    this.ttInputControl.patchValue(val)
    console.log('value in tt-input: ', this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onModelChange(value: string | null) {
    this.onChange(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
