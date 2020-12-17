import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedStartComponent } from './invited-start.component';

describe('InvitedStartComponent', () => {
  let component: InvitedStartComponent;
  let fixture: ComponentFixture<InvitedStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
