import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerIngredientsListComponent } from '../../manager-ingredients-list/manager-ingredients-list.component';

@Component({
    selector: 'manager-home',
    imports: [CommonModule, ManagerIngredientsListComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(private router: Router) {}

    logout() {
        sessionStorage.removeItem('isManagerLoggedIn');
        this.router.navigateByUrl('/manager');
    }
}
