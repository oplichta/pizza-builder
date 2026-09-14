import { fakeAsync, tick } from '@angular/core/testing';
import { PromoService } from './promo.service';

describe('PromoService', () => {
    let service: PromoService;

    beforeEach(() => {
        service = new PromoService();
    });

    it('resolves a known code with its percent after the delay', fakeAsync(() => {
        let result: { code: string; percent: number } | undefined;
        service.check('PIZZA20').subscribe((res) => (result = res));

        expect(result).toBeUndefined();
        tick(800);
        expect(result).toEqual({ code: 'PIZZA20', percent: 20 });
    }));

    it('is case-insensitive when matching codes', fakeAsync(() => {
        let result: { code: string; percent: number } | undefined;
        service.check('pizza20').subscribe((res) => (result = res));
        tick(800);
        expect(result).toEqual({ code: 'pizza20', percent: 20 });
    }));

    it('errors for an unknown code after the delay', fakeAsync(() => {
        let error: Error | undefined;
        service.check('NOPE').subscribe({ error: (err) => (error = err) });

        tick(800);
        expect(error?.message).toBe('Unknown code');
    }));
});