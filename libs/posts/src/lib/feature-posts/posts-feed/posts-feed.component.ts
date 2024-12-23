import { Component, inject } from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../../data-access/posts-service.service';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { selectLoadingStatus, selectPosts } from '../../data-access/posts.selectors';
import { postsActions } from '../../data-access/posts.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent, AsyncPipe, LetDirective],
  templateUrl: './posts-feed.component.html',
  styleUrl: './posts-feed.component.scss',
})
export class PostsFeedComponent {
  private readonly postsService = inject(PostsService);
  private readonly store = inject(Store);
  public posts = this.postsService.posts;
  public posts$ = this.store.select(selectPosts)
  public readonly loadingStatus$ = this.store.select(selectLoadingStatus)

  constructor() {
    //firstValueFrom(this.postsService.getPosts());
    this.store.dispatch(postsActions.getPosts())
  }
}
