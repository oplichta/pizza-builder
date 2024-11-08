import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const PIZZA_SIZE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaSizeComponent),
  multi: true
};

@Component({
  selector: 'pizza-size',
  standalone: true,
  imports: [CommonModule],
  providers: [PIZZA_SIZE_ACCESSOR],
  templateUrl: './pizza-size.component.html',
  styleUrl: './pizza-size.component.scss'
})
export class PizzaSizeComponent implements ControlValueAccessor {
  value?: string;
  focused?: string;
  
  sizes: any[] = [
    { type: 'large', centimeters: 50 },
    { type: 'medium', centimeters: 40 },
    { type: 'small', centimeters: 30 }
  ];

  private onModelChange: (value: any) => void = () => {};
  private onTouch: () => void = () => {};

  registerOnChange(fn: (value: any) => void) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  onChange(value: string) {
    this.value = value;
    this.onModelChange(value);
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    this.onTouch();
  }
}
