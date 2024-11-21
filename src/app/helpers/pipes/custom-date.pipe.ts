import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'customDate',
  pure: true,
  standalone: true,
})

// *** заменить урл на baseApi
export class CustomDate implements PipeTransform {

  // Поправить время, сейчас показывает на 3 часа раньше, чем надо


  transform(date: string | null): string | null {
    if(!date) return null

    const nowTS = Date.now()
    const commentDateTS = Date.parse(date)
    const actualCommentDateTs = commentDateTS + 10800000
    const commentTime = date.slice(11, 16)

    if (commentDateTS > (nowTS - 3600000 * 24)) return `Сегодня, в ${commentTime}`

    if (commentDateTS > (nowTS - 3600000 * 48) && commentDateTS < (nowTS - 3600000 * 24)) return `Вчера, в ${commentTime}`
 
    return date
  }
}   