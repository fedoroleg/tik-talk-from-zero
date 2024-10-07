import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'imgUrl',
  pure: true,
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  transform(imgUrl: String | null): String | null {
    if(!imgUrl) return null
    return `https://icherniakov.ru/yt-course/${imgUrl}`
  }
}