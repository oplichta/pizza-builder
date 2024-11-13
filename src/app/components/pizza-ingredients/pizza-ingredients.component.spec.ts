import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaIngredientsComponent } from './pizza-ingredients.component';

describe('PizzaIngredientsComponent', () => {
  let component: PizzaIngredientsComponent;
  let fixture: ComponentFixture<PizzaIngredientsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaIngredientsComponent],
      providers: [
        provideMockStore({ initialState: {} })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaIngredientsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
