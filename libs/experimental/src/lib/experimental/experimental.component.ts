import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experimental',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experimental.component.html',
  styleUrl: './experimental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperimentalComponent {}
