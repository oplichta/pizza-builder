import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzaSizeComponent } from './pizza-size.component';

describe('PizzaSizeComponent', () => {
  let component: PizzaSizeComponent;
  let fixture: ComponentFixture<PizzaSizeComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaSizeComponent],
      providers: [
        provideMockStore({ initialState: {} })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaSizeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
