import { Routes } from '@angular/router';
import { PizzaBuilderComponent } from './components/pizza-builder/pizza-builder.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    { path: '', component: PizzaBuilderComponent },
    { path: 'order', component: OrderComponent },
];
