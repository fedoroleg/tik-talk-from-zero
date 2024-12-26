import { createFeature, createReducer, on } from '@ngrx/store';
import { Account } from '@tt/common-models';
import { accountsActions } from './accounts.actions';

export type AccountsState = {
  me: Account | null;
  subscribers: Account[] | null;
  account: Account | null;
  accounts: Account[];
  accountsFilters: Record<string, any>;
};

export const accountsInitialState: AccountsState = {
  me: null,
  subscribers: null,
  account: null,
  accounts: [],
  accountsFilters: {},
};

export const accountsFeatureKey = 'accounts';

export const accountsFeature = createFeature({
  name: accountsFeatureKey,
  reducer: createReducer(
    accountsInitialState,
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
    ),
    on(accountsActions.getMeSuccess, (state, { me }) => ({ ...state, me })),
    on(accountsActions.getSubscribersSuccess, (state, { subscribers }) => ({
      ...state,
      subscribers,
    })),
    on(accountsActions.getAccountSucces, (state, { account }) => ({
      ...state,
      account,
    })),
    on(accountsActions.patchAccountSuccess, (state, { account }) => ({
      ...state,
      me: { ...account },
    }))
  ),
});
