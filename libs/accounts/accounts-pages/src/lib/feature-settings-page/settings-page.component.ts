import { Component, effect, inject, ViewChild } from '@angular/core';
//import { AccountHeaderComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { accountsActions, accountsSelectors } from '@tt/accounts/data-access';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    ReactiveFormsModule,
    AvatarUploadComponent,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  private readonly fb = inject(FormBuilder);
  public actualAvatar = 'assets/images/avatar-placeholder.png';
  private readonly store = inject(Store);
  private readonly me = toSignal(this.store.select(accountsSelectors.selectMe));

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  public form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: 'пук', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.me(),
        stack: this.mergeStack(this.me()?.stack),
      });
    });

    console.log('actualAvatar in settings', this.actualAvatar);
  }

  onSubmit() {
    if (this.form.valid) {
      const patchedAccount = {
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
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

  private splitStack(stack: string | null | undefined): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',').map((item) => item.trim());
  }

  private mergeStack(stack: string[] | null | undefined): string {
    if (!stack) return '';
    return stack.join(', ');
  }
}
