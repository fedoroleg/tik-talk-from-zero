import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AccountService } from '../../data-access/services/account.service';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, NgFor, ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  private readonly accountService = inject(AccountService)
  
  public profiles$ = this.accountService.getTestProfiles()

  constructor() {
    this.accountService.getTestProfiles().subscribe(profiles => {
      console.log(profiles);
    })
  }
}
