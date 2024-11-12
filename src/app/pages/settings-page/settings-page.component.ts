import { Component, effect, inject } from '@angular/core';
import { AccountHeaderComponent } from "../../common-ui/account-header/account-header.component";
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { AccountsService } from '../../data-access/services/account.service';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [AccountHeaderComponent, SvgIconComponent, RouterLink, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  private readonly accountService = inject(AccountsService)
  private readonly fb = inject(FormBuilder)

  public form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: 'пук', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.accountService.me(),
        stack: this.mergeStack(this.accountService.me()?.stack)
      })    
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const account = {
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack)
      }
      //@ts-ignore
      firstValueFrom(this.accountService.patchAccount(account))
    }
  }

  private splitStack(stack: string | null | undefined): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack
    
    return stack.split(',').map(item => item.trim())
  }

  private mergeStack(stack: string[] | null | undefined): string {
    if (!stack) return ''
    return stack.join(', ')
  }
}
