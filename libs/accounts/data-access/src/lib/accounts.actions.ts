import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account, PatchAccountDTO } from '@tt/common-models';

export const accountsActions = createActionGroup({
  source: 'account',
  events: {
    filterAccounts: props<{ filters: Record<string, any> }>(),
    filterAccountsSuccess: props<{ filteredAccounts: Account[] }>(),
    getMe: emptyProps(),
    getMeSuccess: props<{ me: Account }>(),
    getSubscribers: emptyProps(),
    getSubscribersSuccess: props<{ subscribers: Account[] }>(),
    getAccount: props<{id: number}>(),
    getAccountSucces: props<{account: Account}>(),
    patchAccount: props<{patchedAccount: PatchAccountDTO}>(),
    patchAccountSuccess: props<{account: Account}>(),
    uploadAvatar: props<{avatar: File}>(),
    uploadAvatarSuccess: props<{account: Account}>(),
    getSearchAccountsNextPage: emptyProps(),
    getSearchAccountsNextPageSuccess: props<{ accounts: Account[] }>(),
  },
});
