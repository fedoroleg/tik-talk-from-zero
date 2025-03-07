import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { TtInputComponent } from '../tt-input/tt-input.component';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [TtInputComponent, ReactiveFormsModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  innerCitySearchInput = new FormControl();

  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onChange() {
    console.log('onChange');
  }
  onTouched() {
    console.log('onTouched');
  }
}
