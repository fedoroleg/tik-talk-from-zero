import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Account } from '@tt/common-models';
import { debounceTime, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NameValidator implements AsyncValidator {
  private http = inject(HttpClient);

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    return this.http
      .get<Account[]>('https://icherniakov.ru/yt-course/account/test_accounts')
      .pipe(
        map((accounts) => {
          return accounts.filter((account) =>
            account.firstName.includes(control.value)
          ).length > 0
            ? null
            : {
                invalidName: {
                  message: `Имя должно быть из списка: ${accounts
                    .map((accounts) => accounts.firstName)
                    .join(', ')}`,
                },
              };
        })
      );
  };
}
