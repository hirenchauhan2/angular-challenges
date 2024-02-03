import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardListItemDirective } from './card-list-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <!-- card image -->
      <ng-content select="[card-header]"></ng-content>

      <section>
        <ng-template
          *ngFor="let item of list"
          [ngTemplateOutlet]="rowTemplateRef"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplateRef!: TemplateRef<unknown>;

  @Output()
  addNewItem = new EventEmitter();

  constructor() {}
}
