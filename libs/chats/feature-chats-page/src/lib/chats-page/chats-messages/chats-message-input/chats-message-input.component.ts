import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'app-chats-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, ReactiveFormsModule],
  templateUrl: './chats-message-input.component.html',
  styleUrl: './chats-message-input.component.scss',
})
export class ChatsMessageInputComponent {
  private readonly r2 = inject(Renderer2);
  public messageInput = new FormControl(null, Validators.required);

  @Input() avatarUrl!: string | null;
  @Output() sendMessage = new EventEmitter<string>();

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  onSendMessage() {
    if (this.messageInput.value) {
      this.sendMessage.emit(this.messageInput.value);
    }
    this.messageInput.setValue(null);
  }
}
