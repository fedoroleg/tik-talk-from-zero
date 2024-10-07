import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from "./common-ui/profile-card/profile-card.component";
import { ProfilesService } from './data-access/services/profiles.service';
import { Profile } from './data-access/interfaces/profile.interface';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, CommonModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly profilesService = inject(ProfilesService)
  
  public profiles$ = this.profilesService.getTestProfiles()

  constructor() {
    this.profilesService.getTestProfiles().subscribe(profiles => {
      console.log(profiles);
    })
  }
}
