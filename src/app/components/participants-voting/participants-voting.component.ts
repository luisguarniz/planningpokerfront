import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-participants-voting',
  templateUrl: './participants-voting.component.html',
  styleUrls: ['./participants-voting.component.css']
})
export class ParticipantsVotingComponent implements OnInit {

  @Input() userList: User[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
