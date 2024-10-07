import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Profile } from '../../data-access/interfaces/profile.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe, CommonModule, NgFor],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input({required: true}) profile!: Profile
}
