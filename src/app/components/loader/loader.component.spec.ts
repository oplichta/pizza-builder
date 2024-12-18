import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSmallComponent } from './loader.component';

describe('LoaderSmallComponent', () => {
  let component: LoaderSmallComponent;
  let fixture: ComponentFixture<LoaderSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
