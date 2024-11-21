import { Component, inject } from '@angular/core';
import { PostInputComponent } from "../post-input/post-input.component";
import { PostComponent } from "../post/post.component";
import { PostsService } from '../../../data-access/services/posts-service.service';
import { firstValueFrom } from 'rxjs';
import { PostComment, PostCommentCreateDto } from '../../../data-access/interfaces/post.interfaces';

export type CreatePost = {
  postText: string;
  id: number;
}

@Component({
  selector: 'app-posts-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './posts-feed.component.html',
  styleUrl: './posts-feed.component.scss'
})
export class PostsFeedComponent {
  private readonly postsService = inject(PostsService)
  public posts = this.postsService.posts

  constructor() {
    firstValueFrom(this.postsService.getPosts())
  }

  onPostCreated({postText, id}: CreatePost) {
    firstValueFrom(this.postsService.createPost({
      title: 'Из универсального инпута',
      content: postText,
      authorId: id,
      communityId: 0,
    }))
  }

  onCommentCreated(comment: PostCommentCreateDto) {
    console.log(comment);
    firstValueFrom(this.postsService.createComment(comment))
  }
}
