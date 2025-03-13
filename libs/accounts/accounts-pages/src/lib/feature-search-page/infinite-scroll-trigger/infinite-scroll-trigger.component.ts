import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-trigger',
  standalone: true,
  imports: [],
  templateUrl: './infinite-scroll-trigger.component.html',
  styleUrl: './infinite-scroll-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollTriggerComponent implements OnInit {
  @Output() loaded = new EventEmitter();

  ngOnInit(): void {
    this.loaded.emit();
  }

}
