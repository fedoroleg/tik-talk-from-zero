import { createSelector } from '@ngrx/store';
import { accountsFeature } from './accounts.reducer';

export const {
  selectAccountsState,
  selectMe,
  selectAccounts,
  selectAccountsFilters,
  selectSubscribers,
  selectAccount
} = accountsFeature;

export const selectAccountsPageable = createSelector(selectAccountsState, (state) => {
  return {page: state.page, size: state.size}
} )
