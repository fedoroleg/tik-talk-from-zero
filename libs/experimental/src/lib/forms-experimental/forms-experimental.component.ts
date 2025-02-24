import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MockService } from '../experimental/mock.service';

enum ReciverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

export type Address = {
  city?: string;
  street?: string;
  building?: number | null;
  apartment?: number | null;
};

function customValidator(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.startsWith(forbiddenLetter)
      ? { startsWith: 'Нельзя начинать с буквы: "' + forbiddenLetter + '"' }
      : null;
  };
}

function validateDateRange(
  fromControlName: string,
  toControlName: string
): ValidatorFn {
  return (control: AbstractControl): null | ValidationErrors => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if (!fromControl || !toControl) return null;

    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);

    if (fromDate && toDate && fromDate > toDate) {
      toControl.setErrors({
        dateRangeError: {
          message: 'Дата начала не может быть раньше даты конца',
        },
      });
      return {
        dateRangeError: {
          message: 'Дата начала не может быть раньше даты конца',
        },
      };
    }

    return null;
  };
}

const validateStartsWith: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.startsWith('z')
    ? { startsWith: 'Нельзя начинать с буквы "z"' }
    : null;
};

@Component({
  selector: 'app-forms-experimental',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './forms-experimental.component.html',
  styleUrl: './forms-experimental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsExperimentalComponent {
  public readonly reciverType = ReciverType;
  private readonly mockService = inject(MockService);

  public form = new FormGroup({
    type: new FormControl<ReciverType>(ReciverType.PERSON),
    name: new FormControl<string>('', [
      Validators.required,
      customValidator('q'),
    ]),
    lastName: new FormControl<string>(''),
    inn: new FormControl<number | null>(null),
    addresses: new FormArray([this.getAddressForm()]),
    dateRange: new FormGroup(
      {
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      },
      [validateDateRange('from', 'to')]
    ),
  });

  constructor() {
    this.mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addresess) => {
        this.form.controls.addresses.clear();

        for (const address of addresess) {
          this.form.controls.addresses.push(this.getAddressForm(address));
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        console.log(val);

        this.form.controls.type.clearValidators();

        if (val === this.reciverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(5),
          ]);
        }
      });
  }

  onAddAddress() {
    this.form.controls.addresses.insert(0, this.getAddressForm());
  }

  onDeleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index);
  }

  onSubmit(event: Event) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    console.log(this.form.valid);
    console.log(this.form.value);
  }

  getAddressForm(address: Address = {}) {
    return new FormGroup({
      city: new FormControl<string>(address.city || ''),
      street: new FormControl<string>(address.street || ''),
      building: new FormControl<number | null>(address.building || null),
      apartment: new FormControl<number | null>(address.apartment || null),
    });
  }
}
