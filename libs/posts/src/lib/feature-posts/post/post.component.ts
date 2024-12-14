import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Comment, Post } from '@tt/common-models';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { CustomDate } from '@tt/common-ui';
import { PostsService } from '../../data-access/posts-service.service';

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
export class PostComponent implements OnInit {
  public post = input<Post>();
  public comments = signal<Comment[]>([]);
  private readonly postService = inject(PostsService);
  public expandComments = false;

  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCommentCreated() {
    await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    ).then((comments) => {
      this.comments.set(comments);
      this.expandComments = true;
    });
  }

  showMoreComments() {
    this.expandComments = true;
  }
}
