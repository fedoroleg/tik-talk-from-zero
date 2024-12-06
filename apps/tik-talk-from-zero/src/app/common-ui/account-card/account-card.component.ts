import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Account } from '../../data-access/interfaces/account.interface';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [CommonModule, AvatarCircleComponent],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss',
})
export class AccountCardComponent {
  @Input({ required: true }) account!: Account;
}
