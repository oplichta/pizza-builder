import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { PromoService } from '../services/promo.service';
import * as OrderActions from './order.actions';
import { catchError, switchMap, map, of } from 'rxjs';

@Injectable()
export class PromoEffects {
    actions$ = inject(Actions);
    promoService = inject(PromoService);

    checkPromo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.checkPromoCode),
            switchMap(({ code }) =>
                this.promoService.check(code).pipe(
                    map((res) => OrderActions.checkPromoCodeSuccess({ code: res.code, percent: res.percent })),
                    catchError(() => of(OrderActions.checkPromoCodeFailure({ code })))
                )
            )
        )
    );
}
