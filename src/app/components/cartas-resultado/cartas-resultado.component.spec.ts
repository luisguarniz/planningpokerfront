import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasResultadoComponent } from './cartas-resultado.component';

describe('CartasResultadoComponent', () => {
  let component: CartasResultadoComponent;
  let fixture: ComponentFixture<CartasResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartasResultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartasResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
