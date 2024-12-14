import { Pipe, PipeTransform } from '@angular/core';
import { environments } from '@tt/environments';

@Pipe({
  name: 'imgUrl',
  pure: true,
  standalone: true,
})

// *** заменить урл на baseApi
export class ImgUrlPipe implements PipeTransform {
  transform(imgUrl: string | null): string | null {
    if (!imgUrl) return null;
    return `${environments.api_url}${imgUrl}`;
  }
}
