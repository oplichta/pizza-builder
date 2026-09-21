import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { PromoEffects } from './promo.effects';
import { PromoService } from '../services/promo.service';
import * as OrderActions from './order.actions';
import { Action } from '@ngrx/store';

describe('PromoEffects', () => {
    let actions$: Observable<Action>;
    let effects: PromoEffects;
    let promoServiceSpy: { check: jest.Mock };

    beforeEach(() => {
        promoServiceSpy = { check: jest.fn() };

        TestBed.configureTestingModule({
            providers: [PromoEffects, provideMockActions(() => actions$), { provide: PromoService, useValue: promoServiceSpy }],
        });

        effects = TestBed.inject(PromoEffects);
    });

    it('dispatches checkPromoCodeSuccess when the service call succeeds', (done) => {
        actions$ = of(OrderActions.checkPromoCode({ code: 'PIZZA20' }));
        promoServiceSpy.check.mockReturnValue(of({ code: 'PIZZA20', percent: 20 }));

        effects.checkPromo$.subscribe((action) => {
            expect(action).toEqual(OrderActions.checkPromoCodeSuccess({ code: 'PIZZA20', percent: 20 }));
            done();
        });
    });

    it('dispatches checkPromoCodeFailure when the service call errors', (done) => {
        actions$ = of(OrderActions.checkPromoCode({ code: 'WRONG' }));
        promoServiceSpy.check.mockReturnValue(throwError(() => new Error('Unknown code')));

        effects.checkPromo$.subscribe((action) => {
            expect(action).toEqual(OrderActions.checkPromoCodeFailure({ code: 'WRONG' }));
            done();
        });
    });
});
