import { Component, inject, input, signal } from '@angular/core';
import { Comment, Post } from '../../../data-access/interfaces/post.interfaces';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { CommonModule } from '@angular/common';
import { PostInputComponent } from "../post-input/post-input.component";
import { CommentComponent } from "./comment/comment.component";
import { CustomDate } from "../../../helpers/pipes/custom-date.pipe";
import { PostsService } from '../../../data-access/services/posts-service.service';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, CommonModule, PostInputComponent, CommentComponent, CustomDate],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  public post = input<Post>()
  public comments = signal<Comment[]>([])
  private readonly postService = inject(PostsService)

  ngOnInit() {
    this.comments.set(this.post()!.comments) 
  }

  async onCommentCreated() {  
    await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id)).then(          
      comments => {
        this.comments.set(comments)}
    )
  }
}
