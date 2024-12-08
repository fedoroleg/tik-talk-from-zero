import { Component, Input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { Comment } from '../../../../data-access/interfaces/post.interfaces';
import { CommonModule } from '@angular/common';
import { CustomDate } from '../../../../helpers/pipes/custom-date.pipe';

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
