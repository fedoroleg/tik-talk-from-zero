import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AccountCardComponent } from '@tt/common-ui';
import { Account } from '@tt/common-models';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [InfiniteScrollDirective, AccountCardComponent, AsyncPipe],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsListComponent {
@Input() accounts!: Account[]

  onScroll() {
    console.log('scroll');
   // this.fetchMoreAccounts();
  }
}
