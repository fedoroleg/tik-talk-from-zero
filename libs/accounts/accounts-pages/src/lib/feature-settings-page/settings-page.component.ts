import { Component, effect, inject, ViewChild } from '@angular/core';
//import { AccountHeaderComponent } from '@tt/common-ui';
import {
  AddressInputComponent,
  DadataService,
  SvgIconComponent,
  TtInputComponent,
} from '@tt/common-ui';
import { accountsActions, accountsSelectors } from '@tt/accounts/data-access';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { StackInputComponent } from '@tt/common-ui';
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
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    ReactiveFormsModule,
    AvatarUploadComponent,
    StackInputComponent,
    TtInputComponent,
    AddressInputComponent,
    AsyncPipe,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  private readonly fb = inject(FormBuilder);
  public actualAvatar = 'assets/images/avatar-placeholder.png';
  private readonly store = inject(Store);
  me = toSignal(this.store.select(accountsSelectors.selectMe));

  dadataService = inject(DadataService);

  isDropdownOpened$ = new BehaviorSubject(false);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  public form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
    city: [''],
  });

  suggestions$ = this.form.controls.city.valueChanges.pipe(
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
    this.form.controls.city.setValue(city, { emitEvent: false });
    this.isDropdownOpened$.next(false);
  }

  constructor() {
    effect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.form.patchValue({
        ...this.me(),
      }, {emitEvent: false});
    });
  }

  onSubmit() {
    console.log('submit: ', this.form.value);

    if (this.form.valid) {
      const patchedAccount = {
        ...this.form.value
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      this.store.dispatch(accountsActions.patchAccount({ patchedAccount }));

      if (this.avatarUploader.avatar) {
        this.store.dispatch(
          accountsActions.uploadAvatar({ avatar: this.avatarUploader.avatar })
        );
      }
    }
  }
}
