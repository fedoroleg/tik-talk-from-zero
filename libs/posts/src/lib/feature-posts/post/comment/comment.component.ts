import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Comment } from '@tt/common-models';
import { CustomDate } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, CommonModule, CustomDate],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: Comment;
}
