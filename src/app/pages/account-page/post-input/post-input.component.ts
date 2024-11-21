import { Component, EventEmitter, HostBinding, inject, input, Input, Output, Renderer2 } from '@angular/core';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../../data-access/services/account.service';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  @Input() isCommentInput!: boolean;
  @Output() commentCreated = new EventEmitter()
  @Output() postCreated = new EventEmitter()

  postId = input<number>()

  private readonly r2 = inject(Renderer2)
  public me = inject(AccountsService).me

  public postText = ''

  // Здесь мы ставим класс comment-input, если поле this.isCommentInput вернет true
  @HostBinding ('class.comment-input')
  get isComment() {
    return this.isCommentInput
  }

  onTextAreaInput(event: Event ) {
    const textArea = event.target as HTMLTextAreaElement
    this.r2.setStyle(textArea, 'height', 'auto')
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px')
  }

  onCreatePost() {
    if (!this.postText) return

    if (this.isCommentInput) {
      this.commentCreated.emit({
        text: this.postText,
        authorId: this.me()!.id,
        postId: this.postId(),
      })
      this.postText = ''
      return
    }
    
    this.postCreated.emit({postText: this.postText, id: this.me()!.id})
    this.postText = ''
  }
}
