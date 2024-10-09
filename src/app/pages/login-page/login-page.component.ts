import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService)

  public loginForm = new FormBuilder().group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    if(this.loginForm.value.username && this.loginForm.value.password){
      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.authService.login(loginData).subscribe(res => console.log('res', res))
    }
  }
  
}
