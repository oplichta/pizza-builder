import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    const run: CanActivateFn = (...params) => TestBed.runInInjectionContext(() => authGuard(...params));
    const snapshot = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideRouter([])] });
        sessionStorage.clear();
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    it('allows access when the manager is logged in', () => {
        sessionStorage.setItem('isManagerLoggedIn', 'true');
        expect(run(snapshot, state)).toBe(true);
    });

    it('redirects to the login route when not logged in', () => {
        const result = run(snapshot, state);
        expect(result).toBeInstanceOf(UrlTree);
        expect(String(result)).toBe('/manager');
    });

    it('treats any value other than the exact flag as logged out', () => {
        sessionStorage.setItem('isManagerLoggedIn', 'yes');
        expect(run(snapshot, state)).toBeInstanceOf(UrlTree);
    });
});
