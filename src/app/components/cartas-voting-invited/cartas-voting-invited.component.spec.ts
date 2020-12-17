import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasVotingInvitedComponent } from './cartas-voting-invited.component';

describe('CartasVotingInvitedComponent', () => {
  let component: CartasVotingInvitedComponent;
  let fixture: ComponentFixture<CartasVotingInvitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartasVotingInvitedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartasVotingInvitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
