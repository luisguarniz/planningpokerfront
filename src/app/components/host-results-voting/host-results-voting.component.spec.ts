import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostResultsVotingComponent } from './host-results-voting.component';

describe('HostResultsVotingComponent', () => {
  let component: HostResultsVotingComponent;
  let fixture: ComponentFixture<HostResultsVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostResultsVotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostResultsVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
