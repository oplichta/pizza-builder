import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../../enviroment';
import { routes } from './app.routes';
import { IngredientEffects } from './store/ingredient.effects';
import { ingredientReducer } from './store/ingredient.reducer';
import { orderReducer } from './store/order.reducer';
import { PromoEffects } from './store/promo.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideStore({ ingredient: ingredientReducer, order: orderReducer }),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects(IngredientEffects, PromoEffects),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideAnalytics(() => getAnalytics()),
    ],
};
