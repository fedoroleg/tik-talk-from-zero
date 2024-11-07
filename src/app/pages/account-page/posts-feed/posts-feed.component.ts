import { Component } from '@angular/core';
import { PostInputComponent } from "../post-input/post-input.component";
import { PostComponent } from "../post/post.component";

@Component({
  selector: 'app-posts-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './posts-feed.component.html',
  styleUrl: './posts-feed.component.scss'
})
export class PostsFeedComponent {

}
