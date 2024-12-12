import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './order-form.component';

describe('OrderFormComponent', () => {
    let component: OrderFormComponent;
    let fixture: ComponentFixture<OrderFormComponent>;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, OrderFormComponent],
            providers: [provideMockStore({ initialState: {} })],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderFormComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
