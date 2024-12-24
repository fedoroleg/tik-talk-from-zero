import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';

import { GlobalStoreService } from '@tt/shared';
import { Store } from '@ngrx/store';
import { postsActions } from '../../data-access/posts.actions';
//import { accountSelectors } from '@tt/account';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  private readonly globalStoreService = inject(GlobalStoreService);
  private readonly store = inject(Store);
  @Input() isCommentInput!: boolean;
  @Output() commentCreated = new EventEmitter();
  postId = input<number>();

  private readonly r2 = inject(Renderer2);
  public me = this.globalStoreService.me;
  //  public me = toSignal(this.store.select(accountSelectors.selectMe));

  public postText = '';

  // Здесь мы ставим класс comment-input, если поле this.isCommentInput вернет true
  @HostBinding('class.comment-input')
  get isComment() {
    return this.isCommentInput;
  }

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return;

    if (this.isCommentInput) {
      this.store.dispatch(
        postsActions.addComment({
          comment: {
            text: this.postText,
            authorId: this.me()!.id,
            postId: this.postId()!,
            commentId: 0,
          },
        })
      );

      this.postText = '';
      this.commentCreated.emit();
    }

    if (!this.isCommentInput) {
      this.store.dispatch(
        postsActions.addPost({
          post: {
            title: 'Пост эпохи NGRX',
            content: this.postText,
            authorId: this.me()!.id,
            communityId: 0,
          },
        })
      );

      this.postText = '';
    }
  }
}
