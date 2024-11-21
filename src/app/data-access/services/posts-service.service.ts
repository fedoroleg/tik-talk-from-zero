import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments'
import { PostComment, PostCommentCreateDto, Post, PostCreateDTO } from '../interfaces/post.interfaces';
import { map, switchMap, tap } from 'rxjs';

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
  public createComment(comment: PostCommentCreateDto) {
    return this.http.post<PostComment>(`${environments.api_url}comment/`, comment ).pipe(
      tap(res => {
        console.log('comment created, res from server: ', res)
        this.updatePostComments(res)
      }),

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

  public getCommentsByPostId(postId: number) {
    return this.http.get<Post>(`${environments.api_url}post/${postId}`).pipe(
      map(post => post.comments)
    )
  }

  private updatePostComments(postComment: PostComment) {
    console.log('updatePostComments run');
    
    this.posts.update(posts => posts.map(post => {
      if (post.id == postComment.postId) return {
        ...post,
        comments: [...post.comments, postComment]
      }
      return post
    }))
  }

}
