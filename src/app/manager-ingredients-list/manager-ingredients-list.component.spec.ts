import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ManagerIngredientsListComponent } from './manager-ingredients-list.component';

describe('ManagerIngredientsListComponent', () => {
    let component: ManagerIngredientsListComponent;
    let fixture: ComponentFixture<ManagerIngredientsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ManagerIngredientsListComponent],
            providers: [
                provideMockStore({ initialState: {} })
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ManagerIngredientsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
