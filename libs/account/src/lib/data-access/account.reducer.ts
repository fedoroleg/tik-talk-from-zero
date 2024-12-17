import { createFeature, createReducer, on } from '@ngrx/store';
import { Account } from '@tt/common-models';
import { accountsActions } from './account.actions';

export type AccountsState = {
  accounts: Account[];
  accountsFilters: Record<string, any>;
};

export const accountsInitialState: AccountsState = {
  accounts: [],
  accountsFilters: {},
};

export const accountsFeatureKey = 'accounts';

export const accountsFeature = createFeature({
  name: accountsFeatureKey,
  reducer: createReducer(
    accountsInitialState,
    on(accountsActions.initAccountsSuccess, (state, { accounts }) => ({
      ...state,
      accounts,
    })),
    on(accountsActions.filterAccounts, (state, { filters }) => ({
      ...state,
      accountsFilters: filters,
    })),
    on(
      accountsActions.filterAccountsSuccess,
      (state, { filteredAccounts }) => ({
        ...state,
        accounts: filteredAccounts,
      })
    )
  ),
});
