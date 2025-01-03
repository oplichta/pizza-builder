import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostListener, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PizzaSize } from '../../store/order.models';

@Component({
    selector: 'pizza-size',
    imports: [CommonModule],
    templateUrl: './pizza-size.component.html',
    styleUrls: ['./pizza-size.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PizzaSizeComponent),
            multi: true,
        },
    ],
})
export class PizzaSizeComponent implements ControlValueAccessor, OnInit {
    value = PizzaSize.Small;
    sizes = [
        { type: PizzaSize.Small, centimeters: 30 },
        { type: PizzaSize.Medium, centimeters: 40 },
        { type: PizzaSize.Large, centimeters: 50 },
    ];
    isMobileView: boolean = false;

    private onChange: (value: PizzaSize) => void = () => {};
    private onTouched: () => void = () => {};

    ngOnInit(): void {
      this.checkScreenSize();
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
      this.checkScreenSize();
    }
  
    private checkScreenSize(): void {
      this.isMobileView = window.innerWidth < 400;
    }

    onChangeSize(value: PizzaSize) {
        this.value = value;
        this.onChange(value);
        this.onTouched();
    }

    // ControlValueAccessor methods
    writeValue(value: PizzaSize): void {
        this.value = value;
    }

    registerOnChange(fn: (value: PizzaSize) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {}
}
