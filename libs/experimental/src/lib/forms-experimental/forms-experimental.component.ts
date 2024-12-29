import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms-experimental',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './forms-experimental.component.html',
  styleUrl: './forms-experimental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsExperimentalComponent {
  public form = new FormGroup({});
}
