import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {
  public readonly authService = inject(AuthService)
  
  //public readonly isLoggedIn$ = this.authService.isLoggedIn$

}
