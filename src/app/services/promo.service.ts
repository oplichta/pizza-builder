import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PromoService {
    private readonly codes: Record<string, number> = {PIZZA20: 20, MARGHERITA: 15, STUDENT: 10};

    check(code: string): Observable<{ code: string; percent: number }> {
        const percent = this.codes[code.toLocaleUpperCase()];
        return percent
        ? of({ code, percent}).pipe(delay(800))
        : throwError(() => new Error('Unknown code')).pipe(delay(800));
    }
}
