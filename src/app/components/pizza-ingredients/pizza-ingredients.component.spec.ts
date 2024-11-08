import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaIngredientsComponent } from './pizza-ingredients.component';

describe('PizzaIngredientsComponent', () => {
  let component: PizzaIngredientsComponent;
  let fixture: ComponentFixture<PizzaIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaIngredientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
