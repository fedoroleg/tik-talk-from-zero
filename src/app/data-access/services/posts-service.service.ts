import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments'
import { Comment, CommentCreateDto, Post, PostCreateDTO } from '../interfaces/post.interfaces';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly http = inject(HttpClient)
  
  public posts = signal<Post[]>([])

  public createPost(post: PostCreateDTO) {
    return this.http.post<Post>(`${environments.api_url}post/`, post ).pipe(
      switchMap(() => {
        return this.getPosts()
      })
    )
  }
  public createComment(comment: CommentCreateDto) {
    return this.http.post<Comment>(`${environments.api_url}comment/`, comment ).pipe(
      tap(res => console.log(res)
      )
    )
  }

  public getPosts() {
    return this.http.get<Post[]>(`${environments.api_url}post/`).pipe(
      tap(posts => {
        this.posts.set(posts)  
        console.log(this.posts());    
      })
    )
  }

}
