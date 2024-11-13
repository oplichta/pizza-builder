import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaCreatorComponent } from './pizza-creator.component';

describe('PizzaCreatorComponent', () => {
  let component: PizzaCreatorComponent;
  let fixture: ComponentFixture<PizzaCreatorComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaCreatorComponent],
      providers: [
        provideMockStore({ initialState: {} })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaCreatorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(PizzaCreatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Choose your pizzas');
  });
});