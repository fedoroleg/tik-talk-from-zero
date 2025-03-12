import { createFeature, createReducer, on } from '@ngrx/store';
import { Account } from '@tt/common-models';
import { accountsActions } from './accounts.actions';

export type AccountsState = {
  me: Account | null;
  subscribers: Account[] | null;
  account: Account | null;
  accounts: Account[];
  accountsFilters: Record<string, any>;
  page: number;
  size: number;
};

export const accountsInitialState: AccountsState = {
  me: null,
  subscribers: null,
  account: null,
  accounts: [],
  accountsFilters: {},
  page: 1,
  size: 10,
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
    })),
    on(accountsActions.uploadAvatarSuccess, (state, { account }) => ({
      ...state,
      me: { ...account },
    })),
    on(accountsActions.getSearchAccountsNextPage, (state ) => ({
      ...state,
      page: state.page + 1
    })),
    on(accountsActions.getSearchAccountsNextPageSuccess, (state, {accounts}) => ({...state, accounts: [...state.accounts, ...accounts]}))
  ),
});
