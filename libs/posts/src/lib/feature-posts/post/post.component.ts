import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { map } from 'rxjs';
import { Post } from '@tt/common-models';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { CustomDate } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { selectPosts } from '../../data-access/posts.selectors';
import { postsActions } from '../../data-access/posts.actions';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    CommonModule,
    PostInputComponent,
    CommentComponent,
    CustomDate,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  public readonly store = inject(Store);
  public post = input<Post>();
  public readonly comments$ = this.store.select(selectPosts).pipe(
    map((posts) => {
      const postComments = posts.find((post) => post.id === this.post()!.id);
      return postComments?.comments;
    })
  );
  public expandComments = false;

  async onCommentCreated() {
    this.expandComments = true;
  }

  showMoreComments() {
    this.expandComments = true;
  }

  onDeletePost() {
    this.store.dispatch(postsActions.deletePost({ id: this.post()!.id }));
  }
}
