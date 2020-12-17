import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnStopVotingComponent } from './btn-stop-voting.component';

describe('BtnStopVotingComponent', () => {
  let component: BtnStopVotingComponent;
  let fixture: ComponentFixture<BtnStopVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnStopVotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnStopVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
