import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments'
import { PostCreateDTO } from '../interfaces/post.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly http = inject(HttpClient)
  
  
  public createPost(post: PostCreateDTO) {
    return this.http.post(`${environments.api_url}post/`, post )
  }

}
