import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '@tt/auth2';
import { TtInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  ngOnInit() {
    this.loginForm.valueChanges.subscribe((val) => console.log(val));
    // this.loginForm.controls.username.disable();
  }

  public loginForm = new FormBuilder().group({
    username: ['йцукен', Validators.required],
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
