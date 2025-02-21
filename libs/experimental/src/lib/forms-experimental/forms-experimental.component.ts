import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
    name: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>(''),
    inn: new FormControl<number | null>(null),
    addresses: new FormArray([this.getAddressForm()]),
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
