import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerIngredientsListComponent } from '../../manager-ingredients-list/manager-ingredients-list.component';

@Component({
    selector: 'manager-home',
    imports: [ManagerIngredientsListComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    private router = inject(Router);

    logout() {
        sessionStorage.removeItem('isManagerLoggedIn');
        this.router.navigateByUrl('/manager');
    }
}
