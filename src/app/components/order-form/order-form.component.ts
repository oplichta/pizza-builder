import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  @Input() parent?: FormGroup;
  @Input() totalPrice?: string;
  @Input() prices: any;

  @Output() add = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<number>();
  @Output() submit = new EventEmitter<any>();

  onAddPizza(event: any) {
    this.add.emit(event);
  }

  onRemovePizza(event: any) {
    this.remove.emit(event);
  }

  onToggle(event: any) {
    this.toggle.emit(event);
  }

  onSubmit(event: any) {
    event.stopPropagation();
    this.submit.emit(this.parent);
  }

}
