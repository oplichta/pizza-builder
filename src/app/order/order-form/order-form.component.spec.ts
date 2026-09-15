import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './order-form.component';

describe('OrderFormComponent', () => {
    let component: OrderFormComponent;
    let fixture: ComponentFixture<OrderFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, OrderFormComponent],
            providers: [provideMockStore({ initialState: {} })],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderFormComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
