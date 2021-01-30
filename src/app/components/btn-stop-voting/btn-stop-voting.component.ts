
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { VoteSessionService } from 'src/app/services/vote-session.service';

@Component({
  selector: 'app-btn-stop-voting',
  templateUrl: './btn-stop-voting.component.html',
  styleUrls: ['./btn-stop-voting.component.css']
})
export class BtnStopVotingComponent implements OnInit {

  @Output() showDiv = new EventEmitter<boolean>();
  @Input() ListaVotos ;

  //VotingSessionCode;
  //mostrarDiv : boolean = true;
  roomCode;
  echo;
  constructor(private router:Router,
    private votesessionservice : VoteSessionService,
    private messageservice : MessageService,
    private dataservice: DataService) 
    { 
      this.roomCode = dataservice.Servicesrooms.RoomCode;
      this.echo = this.messageservice.websocket();
    }

  ngOnInit(): void {
  }
}
