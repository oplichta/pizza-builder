import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaPreviewComponent } from './pizza-preview.component';

describe('PizzaPreviewComponent', () => {
  let component: PizzaPreviewComponent;
  let fixture: ComponentFixture<PizzaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
