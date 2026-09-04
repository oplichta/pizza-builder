import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, skip } from 'rxjs';
import { checkPromoCode, clearPromoCode } from '../../store/order.actions';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { selectPromo } from '../../store/order.selectors';
import { LoaderComponent } from '../loader/loader.component';

const MIN_CODE_LENGTH = 3;
const TYPING_PAUSE_MS = 400;

@Component({
    selector: 'promo-code',
    templateUrl: './promo-code.component.html',
    styleUrls: ['./promo-code.component.scss'],
    imports: [LoaderComponent],
})
export class PromoCodeComponent {
    private store = inject(Store);

    // Bridge in other way than toObservable: stream from store to signal
    private promo = toSignal(this.store.select(selectPromo), { requireSync: true });

    promoCode = signal('');

    isChecking = computed(() => this.promo().status === 'checking');

    message = computed(() => {
        const { status, code, percent } = this.promo();
        switch (status) {
            case 'valid':
                return `Kod ${code} — rabat ${percent}%`;
            case 'invalid':
                return `Nieznany kod ${code}`;
            default:
                return null;
        }
    });

    statusClass = computed(() => {
        switch (this.promo().status) {
            case 'valid':
                return 'promo--ok';
            case 'invalid':
                return 'promo--error';
            default:
                return '';
        }
    });

    constructor() {
        toObservable(this.promoCode)
            .pipe(
                // toObservable relies on effect(), so it emits the initial signal value.
                // Without skip(1), every visit to /order would dispatch clearPromoCode.
                skip(1),
                debounceTime(TYPING_PAUSE_MS),
                // Normalization BEFORE deduplication - otherwise distinctUntilChanged compares noise.
                map((code) => code.trim().toUpperCase()),
                distinctUntilChanged(),
                takeUntilDestroyed()
            )
            .subscribe((code) => {
                if (code.length >= MIN_CODE_LENGTH) {
                    this.store.dispatch(checkPromoCode({ code }));
                } else {
                    this.store.dispatch(clearPromoCode());
                }
            });
    }
}
