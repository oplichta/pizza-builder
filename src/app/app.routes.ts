import { Routes } from '@angular/router';
import { PizzaBuilderComponent } from './components/pizza-builder/pizza-builder.component';
import { OrderComponent } from './order/order.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { LoginComponent } from './manager/login/login.component';
import { HomeComponent } from './manager/home/home.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: PizzaBuilderComponent },
    { path: 'order', component: OrderComponent },
    { path: 'delivery', component: DeliveryComponent },
    { path: 'manager', component: LoginComponent },
    { path: 'manager/home', component: HomeComponent, canActivate: [AuthGuard] },
];
