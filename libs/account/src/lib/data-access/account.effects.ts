import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { accountsActions } from "./account.actions";
import { map, switchMap } from "rxjs";
import { Account, Pageble } from "@tt/common-models";
import { environments } from "@tt/environments";

export const filterAccountsEffect = createEffect((actions$ = inject(Actions), http = inject(HttpClient)) => {
  return actions$.pipe(
    ofType(accountsActions.filterAccounts),
    switchMap(({filters}) => {
      return http.get<Pageble<Account>>(`${environments.api_url}account/accounts`, {
        params: filters,
      }).pipe(
        map((filteredAccounts) => accountsActions.filterAccountsSuccess({filteredAccounts: filteredAccounts.items}))
      )
    })
  )
}, {functional: true})