import { Component, Input } from '@angular/core';
import { Account } from '../../data-access/interfaces/account.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-account-header',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.scss'
})
export class AccountHeaderComponent {
  @Input() account!: Account
}
