import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, HostListener, OnInit, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PizzaSize } from '../../store/order.models';

@Component({
    selector: 'pizza-size',
    imports: [TitleCasePipe],
    templateUrl: './pizza-size.component.html',
    styleUrls: ['./pizza-size.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PizzaSizeComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaSizeComponent implements ControlValueAccessor, OnInit {
    value = PizzaSize.Small;
    sizes = [
        { type: PizzaSize.Small, centimeters: 30 },
        { type: PizzaSize.Medium, centimeters: 40 },
        { type: PizzaSize.Large, centimeters: 50 },
    ];
    isMobileView = signal(false);
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- ControlValueAccessor no-op default
    private onChange: (value: PizzaSize) => void = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- ControlValueAccessor no-op default
    private onTouched: () => void = () => {};

    ngOnInit(): void {
        this.checkScreenSize();
    }

    @HostListener('window:resize')
    onResize(): void {
        this.checkScreenSize();
    }

    private checkScreenSize(): void {
        this.isMobileView.set(window.innerWidth < 400);
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars -- ControlValueAccessor requires this signature and the body is intentionally a no-op
    setDisabledState?(isDisabled: boolean): void {}
}
