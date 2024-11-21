import { Component, Input } from '@angular/core';
import { AvatarCircleComponent } from "../../../../common-ui/avatar-circle/avatar-circle.component";
import { Comment } from '../../../../data-access/interfaces/post.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!: Comment
}
