import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderComponent],
            providers: [
                provideMockStore({ initialState: {} })
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
