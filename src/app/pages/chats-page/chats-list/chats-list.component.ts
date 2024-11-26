import { Component, inject } from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatsListItemComponent } from "./chats-list-item/chats-list-item.component";
import { ChatsService } from '../../../data-access/services/chats.service';
import { Chat, LastMessageRes } from '../../../data-access/interfaces/chats.interfaces';
import { filter, map, startWith, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [ChatsListItemComponent, AsyncPipe, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  private readonly chatsService = inject(ChatsService)

  public chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {    
      return this.searchChatInput.valueChanges.pipe(
        startWith(''),
        map(value => {
            return chats.filter(chat => {
              const partnerFullName = `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              return partnerFullName.toLowerCase().includes(value!)
            })
        })
      )
    })
  )

  public searchChatInput = new FormControl('')


}
