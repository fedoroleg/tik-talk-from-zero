import { createSelector } from "@ngrx/store";
import { accountsFeature } from "./account.reducer";

export const selectFilteredAccounts = createSelector(
  accountsFeature.selectAccounts,
  (accounts) => accounts
)