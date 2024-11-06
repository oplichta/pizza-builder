import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaBuilderComponent } from './pizza-builder.component';

describe('PizzaBuilderComponent', () => {
  let component: PizzaBuilderComponent;
  let fixture: ComponentFixture<PizzaBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
