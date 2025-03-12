import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { accountsActions } from '@tt/accounts/data-access';

@Component({
  selector: 'app-infinite-scroll-trigger',
  standalone: true,
  imports: [],
  templateUrl: './infinite-scroll-trigger.component.html',
  styleUrl: './infinite-scroll-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollTriggerComponent implements OnInit {
  store = inject(Store)
  ngOnInit(): void {
    console.log('InfiniteScrollTriggerComponent onInit')
    
    this.store.dispatch(accountsActions.getSearchAccountsNextPage())
  }

}
