import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DadataSuggestion } from '@tt/common-models';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DadataService {
  private readonly api_url =
    'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private readonly token = 'b68d91dfdd7aec88f75cc41d38527187e2edc7f5';
  private readonly secret = 'c0624adaf2faacc0269ea5fc5254290e41532c41';

  private readonly http = inject(HttpClient);

  private readonly query = 'спб';

  getCitySuggestion(query: string | null) {
    const options = {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.token,
        'X-Secret': this.secret,
      },
      // body: JSON.stringify([query]),
    };

    return this.http
      .post<{ suggestions: DadataSuggestion[] }>(
        this.api_url,
        { query },
        options
      )
      .pipe(
        map((res) =>
          res.suggestions)
        
      );
  }
}
