import { Component, Input } from '@angular/core';
import { Post } from '../../../data-access/interfaces/post.interfaces';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: Post
}
