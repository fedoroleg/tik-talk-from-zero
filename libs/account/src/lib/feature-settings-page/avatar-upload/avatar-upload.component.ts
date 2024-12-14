import { Component, Input, OnInit, signal } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { DragAndDropDirective } from '@tt/common-ui';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DragAndDropDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent implements OnInit {
  @Input({ required: true }) actualAvatar!: string;

  public preview = signal<string>('assets/images/avatar-placeholder.png');
  // public preview = signal<string>(this.actualAvatar)
  public avatar: File | null = null;

  constructor() {
    console.log(
      'actualAvatar in avatarComp constructor === ',
      this.actualAvatar
    );
  }

  ngOnInit(): void {
    this.preview.set(this.actualAvatar);
    console.log('OI actualAvatar in avatarComp === ', this.actualAvatar);
  }

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() || '');
    };
    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
