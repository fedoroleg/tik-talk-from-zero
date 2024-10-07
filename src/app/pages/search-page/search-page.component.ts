import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ProfilesService } from '../../data-access/services/profiles.service';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, NgFor, ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  private readonly profilesService = inject(ProfilesService)
  
  public profiles$ = this.profilesService.getTestProfiles()

  constructor() {
    this.profilesService.getTestProfiles().subscribe(profiles => {
      console.log(profiles);
    })
  }
}
