import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostVotingComponent } from './host-voting.component';

describe('HostVotingComponent', () => {
  let component: HostVotingComponent;
  let fixture: ComponentFixture<HostVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostVotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
