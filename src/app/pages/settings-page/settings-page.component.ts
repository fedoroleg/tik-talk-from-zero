import { Component, effect, inject } from '@angular/core';
import { AccountHeaderComponent } from "../../common-ui/account-header/account-header.component";
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { AccountsService } from '../../data-access/services/account.service';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [AccountHeaderComponent, SvgIconComponent, RouterLink, ReactiveFormsModule],
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
      this.form.patchValue(this.accountService.me())    
    })
  }

  onSubmit() {
    if (this.form.valid) {
      //@ts-ignore
      this.accountService.patchAccount(this.form.value)
    }
  }
}
