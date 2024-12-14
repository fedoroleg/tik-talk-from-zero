import { Component, Input } from '@angular/core';
import { Account } from '@tt/common-models';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-account-header',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.scss',
})
export class AccountHeaderComponent {
  @Input() account!: Account;
}
