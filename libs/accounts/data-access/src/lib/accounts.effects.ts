import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { accountsActions } from './accounts.actions';
import { map, switchMap } from 'rxjs';
import { Account, Pageble } from '@tt/common-models';
import { environments } from '@tt/environments';

export const filterAccountsEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(accountsActions.filterAccounts),
      switchMap(({ filters }) => {
        return http
          .get<Pageble<Account>>(`${environments.api_url}account/accounts`, {
            params: filters,
          })
          .pipe(
            map((filteredAccounts) =>
              accountsActions.filterAccountsSuccess({
                filteredAccounts: filteredAccounts.items,
              })
            )
          );
      })
    );
  },
  { functional: true }
);

export const getMeEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(accountsActions.getMe),
      switchMap(() => {
        return http
          .get<Account>(`${environments.api_url}account/me`)
          .pipe(map((me) => accountsActions.getMeSuccess({ me })));
      })
    );
  },
  { functional: true }
);

export const getSubscribersEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(accountsActions.getSubscribers),
      switchMap(() => {
        return http
          .get<Pageble<Account>>(
            `${environments.api_url}account/subscribers/?page=1&size=50`
          )
          .pipe(
            map((pagebleSubscribers) => {
              return accountsActions.getSubscribersSuccess({
                subscribers: pagebleSubscribers.items,
              });
            })
          );
      })
    );
  },
  { functional: true }
);

export const getAccountEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(accountsActions.getAccount),
      switchMap(({ id }) => {
        return http
          .get<Account>(`${environments.api_url}account/${id}`)
          .pipe(
            map((account) => accountsActions.getAccountSucces({ account }))
          );
      })
    );
  },
  { functional: true }
);

export const patchAccountEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(accountsActions.patchAccount),
      switchMap(({ patchedAccount }) => {
        return http
          .patch<Account>(`${environments.api_url}account/me`, patchedAccount)
          .pipe(
            map((account) => accountsActions.patchAccountSuccess({ account }))
          );
      })
    );
  },
  { functional: true }
);

export const uploadAvatarEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(accountsActions.uploadAvatar),
      switchMap(({ avatar }) => {
        const fd = new FormData();
        fd.append('image', avatar);
        return http
          .post<Account>(`${environments.api_url}account/upload_image`, fd)
          .pipe(
            map((account) => accountsActions.uploadAvatarSuccess({ account }))
          );
      })
    );
  },
  { functional: true }
);
