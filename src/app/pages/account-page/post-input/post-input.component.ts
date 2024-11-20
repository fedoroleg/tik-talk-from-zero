import { Component, inject, Renderer2 } from '@angular/core';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../../data-access/services/account.service';
import { PostCreateDTO } from '../../../data-access/interfaces/post.interfaces';
import { PostsService } from '../../../data-access/services/posts-service.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  private readonly r2 = inject(Renderer2)
  public me = inject(AccountsService).me
  private readonly postsService = inject(PostsService)

  public postText = ''

  onTextAreaInput(event: Event ) {
    const textArea = event.target as HTMLTextAreaElement
    this.r2.setStyle(textArea, 'height', 'auto')
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px')
  }

  onCreatePost() {
    if (!this.postText) return

    const post: PostCreateDTO = {
      title: 'Пока без названия...',
      content: this.postText,
      authorId: this.me()!.id,
      communityId: 0,
    }

    firstValueFrom(this.postsService.createPost(post)).then(() => { this.postText = ''})
    
  }
}
