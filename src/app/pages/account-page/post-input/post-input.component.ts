import { Component, inject, Renderer2 } from '@angular/core';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  private readonly r2 = inject(Renderer2)

  onTextAreaInput(event: Event ) {
    const textArea = event.target as HTMLTextAreaElement
    this.r2.setStyle(textArea, 'height', 'auto')
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px')
  }
}
