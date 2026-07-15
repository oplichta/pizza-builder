import { Routes } from '@angular/router';
import { PizzaBuilderComponent } from './components/pizza-builder/pizza-builder.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './manager/login/login.component';
import { HomeComponent } from './manager/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: PizzaBuilderComponent },
    { path: 'order', component: OrderComponent },
    // Lazy-loaded: pulls in mapbox-gl, which is too heavy to bundle into the initial chunk.
    { path: 'delivery', loadComponent: () => import('./delivery/delivery.component').then((m) => m.DeliveryComponent) },
    { path: 'manager', component: LoginComponent },
    { path: 'manager/home', component: HomeComponent, canActivate: [authGuard] },
];
