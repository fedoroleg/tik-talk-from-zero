import { Component, inject, Input, Renderer2 } from '@angular/core';
import { AvatarCircleComponent } from "../../../../common-ui/avatar-circle/avatar-circle.component";
import { SvgIconComponent } from '../../../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-chats-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent],
  templateUrl: './chats-message-input.component.html',
  styleUrl: './chats-message-input.component.scss'
})
export class ChatsMessageInputComponent {
  private readonly r2 = inject(Renderer2)
  @Input() avatarUrl!: string | null

  onTextAreaInput(event: Event ) {
    const textArea = event.target as HTMLTextAreaElement
    this.r2.setStyle(textArea, 'height', 'auto')
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px')
  }
}
