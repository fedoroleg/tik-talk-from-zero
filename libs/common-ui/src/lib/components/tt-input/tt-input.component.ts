import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'tt-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  // этот метод нужен, чтобы модель отдала свое значение шаблону
  writeValue(val: string | null): void {
    this.value = val;
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
    console.log('setDisabled: ', isDisabled);

    this.isDisabled = isDisabled;
  }
}
