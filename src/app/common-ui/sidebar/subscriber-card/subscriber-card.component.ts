import { Component, Input } from '@angular/core';
import { Account } from '../../../data-access/interfaces/account.interface';
import { ImgUrlPipe } from "../../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent {
  @Input() subscriber!: Account
  // @Input({ required: true }) subscriber!: Account
}
