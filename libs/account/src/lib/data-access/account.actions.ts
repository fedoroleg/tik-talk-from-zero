import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Account, Pageble } from "@tt/common-models";

export const accountsActions = createActionGroup(
  {source: 'account',
  events: {
    initAccounts: emptyProps(),
    initAccountsSuccess: props<{accounts: Account[]}>(),
    filterAccounts: props<{filters: Record<string, any>}>(),
    filterAccountsSuccess: props<{filteredAccounts: Account[]}>(),
  } 
})