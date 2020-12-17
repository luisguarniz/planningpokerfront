import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostInicioComponent } from './host-inicio.component';

describe('HostInicioComponent', () => {
  let component: HostInicioComponent;
  let fixture: ComponentFixture<HostInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
