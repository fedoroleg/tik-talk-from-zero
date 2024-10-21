import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Account } from '../../data-access/interfaces/account.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [ImgUrlPipe, CommonModule, NgFor],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss'
})
export class AccountCardComponent {
  @Input({required: true}) account!: Account
}
