import { Pipe, PipeTransform } from '@angular/core';
import { environments } from '../../../environments/environments';

@Pipe({
  name: 'imgUrl',
  pure: true,
  standalone: true,
})

// *** заменить урл на baseApi
export class ImgUrlPipe implements PipeTransform {
  transform(imgUrl: String | null): String | null {
    if (!imgUrl) return null;
    return `${environments.api_url}${imgUrl}`;
  }
}
