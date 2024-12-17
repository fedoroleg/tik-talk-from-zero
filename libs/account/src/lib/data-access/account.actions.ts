import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Account } from "@tt/common-models";

export const accountsActions = createActionGroup(
  {source: 'account',
  events: {
    filterAccounts: props<{filters: Record<string, any>}>(),
    filterAccountsSuccess: props<{filteredAccounts: Account[]}>(),
  } 
})