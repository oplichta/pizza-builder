import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate('300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate('200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(-200px)', opacity: 0 }))
  ])
]);

@Component({
  selector: 'app-pizza-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-preview.component.html',
  styleUrl: './pizza-preview.component.scss',
})
export class PizzaPreviewComponent {
  @Input() pizzas?: FormArray;
  @Input() activePizza?: number;
}
