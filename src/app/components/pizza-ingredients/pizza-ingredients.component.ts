import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PIZZA_INGREDIENTS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaIngredientsComponent),
  multi: true
};


@Component({
  selector: 'pizza-ingredients',
  standalone: true,
  imports: [CommonModule],
  providers: [PIZZA_INGREDIENTS_ACCESSOR],
  templateUrl: './pizza-ingredients.component.html',
  styleUrl: './pizza-ingredients.component.scss'
})
export class PizzaIngredientsComponent {

  ingredients = [
    'anchovy', 'bacon', 'basil', 'chili', 'mozzarella', 'mushroom',
    'olive', 'onion', 'pepper', 'pepperoni', 'sweetcorn', 'tomato'
  ];

  value: string[] = [];
  focused?: string;

  private onModelChange: (value: any) => void = () => {};
  private onTouch: () => void = () => {};

  registerOnChange(fn: (value: any) => void) {
    console.log('registerOnChange', this.value);
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  writeValue(value: any) {
    this.value = value;
  }

  updateIngredient(ingredient: string) {
    console.log('updateIngredient', ingredient);
    if (this.value.includes(ingredient)) {
      this.value = this.value.filter((x: string) => ingredient !== x);
    } else {
      this.value = this.value.concat([ingredient]);
    }
    this.onModelChange(this.value);
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    this.onTouch();
  }



}
