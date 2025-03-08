import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService } from '../../services/dadata.service';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [TtInputComponent, ReactiveFormsModule, AsyncPipe],
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

  isDropdownOpened$ = new BehaviorSubject(false);
  dadataService = inject(DadataService);

  suggestions$ = this.innerCitySearchInput.valueChanges.pipe(
    debounceTime(500),
    filter((str) => typeof str === 'string'),
    switchMap((str) =>
      this.dadataService.getCitySuggestion(str).pipe(
        tap((res) => console.log('res = ', res)),
        tap((res) => this.isDropdownOpened$.next(!!res.length)),
        map((suggestions) => {
          const onlyCities = suggestions.map((suggestion) => suggestion.value);
          const onlyUniqueCities = Array.from(new Set(onlyCities));
          return onlyUniqueCities;
        })
      )
    )
  );

  onSelectCity(city: string | null) {
    this.innerCitySearchInput.patchValue(city, { emitEvent: false });
    this.isDropdownOpened$.next(false);
  }

  writeValue(city: string | null): void {
    console.log('writeValue in addr comp: ', city)
    
    this.innerCitySearchInput.patchValue(city, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(city: string | null) {
    this.innerCitySearchInput.patchValue(city);
    console.log('onChange ');
  }
  onTouched() {
    console.log('onTouched');
  }
}
