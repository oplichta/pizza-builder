import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCreatorComponent } from './pizza-creator.component';

describe('PizzaCreatorComponent', () => {
  let component: PizzaCreatorComponent;
  let fixture: ComponentFixture<PizzaCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
