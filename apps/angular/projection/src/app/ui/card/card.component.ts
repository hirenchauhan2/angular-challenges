import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardListItemDirective } from './card-list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-header]"></ng-content>

    <section>
      @for (item of list; track item.id) {
        <ng-template
          [ngTemplateOutlet]="rowTemplateRef"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, ListItemComponent],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;

  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplateRef!: TemplateRef<unknown>;

  @Output()
  addNewItem = new EventEmitter();

  constructor() {}
}
