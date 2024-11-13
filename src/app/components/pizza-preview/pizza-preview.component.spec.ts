import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaPreviewComponent } from './pizza-preview.component';

describe('PizzaPreviewComponent', () => {
  let component: PizzaPreviewComponent;
  let fixture: ComponentFixture<PizzaPreviewComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaPreviewComponent],
      providers: [
        provideMockStore({ initialState: {} })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaPreviewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
