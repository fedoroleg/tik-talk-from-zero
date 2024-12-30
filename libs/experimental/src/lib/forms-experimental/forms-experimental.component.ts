import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

enum ReciverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

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

  public form = new FormGroup({
    type: new FormControl<ReciverType>(ReciverType.PERSON),
    name: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>(''),
    inn: new FormControl<number | null>(null),
    address: new FormGroup({
      city: new FormControl<string>(''),
      street: new FormControl<string>(''),
      building: new FormControl<number | null>(null),
      apartment: new FormControl<number | null>(null),
    }),
  });

  constructor() {
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

  onSubmit(event: Event) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    console.log(this.form.valid);
    console.log(this.form.value);
  }
}
