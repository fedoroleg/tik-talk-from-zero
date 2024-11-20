import { Component, inject } from '@angular/core';
import { PostInputComponent } from "../post-input/post-input.component";
import { PostComponent } from "../post/post.component";
import { PostsService } from '../../../data-access/services/posts-service.service';
import { firstValueFrom } from 'rxjs';

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
}
