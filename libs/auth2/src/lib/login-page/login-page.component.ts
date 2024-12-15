import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '@tt/auth2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  public loginForm = new FormBuilder().group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.authService.login(loginData).subscribe((res) => {
        console.log('res', res);
        this.router.navigate(['']);
      });
    }
  }
}
