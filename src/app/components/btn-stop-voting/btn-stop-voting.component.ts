
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  VotingSessionCode;
  ListaVotos;
  mostrarDiv : boolean = true;
  unblockvoting;
  roomCode;
  msgtrue = true;
  echo;
  constructor(private router:Router,
    private votesessionservice : VoteSessionService,
    private messageservice : MessageService,
    private dataservice: DataService) 
    { 
      this.ListaVotos = [];
      this.roomCode = dataservice.Servicesrooms.RoomCode;
      this.echo = this.messageservice.websocket();
    }

  ngOnInit(): void {
  }
  resultVoting(){
    //aca hacer una llamada a un metodo que desactive la sala actual "colocar en 0 IsActive";
    
    this.showDiv.emit(this.mostrarDiv);
    this.VotingSessionCode = this.dataservice.VotingSessionCode;
    this.votesessionservice.getVotingSession(this.VotingSessionCode)
    .subscribe((response) => {
    this.ListaVotos = response; 
    });

    const socketsID = this.echo.socketId();
    
    this.votesessionservice.limpiarCartas(this.msgtrue,this.roomCode, socketsID)
    .subscribe( resp =>{
      console.log(resp);
    }) 
  }
}
