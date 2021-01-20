import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Echo from 'laravel-echo';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { UnblockVotingService } from 'src/app/services/unblock-voting.service';
import { User } from 'src/app/services/user';
import { VoteSessionService } from 'src/app/services/vote-session.service';


@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent implements OnInit {
@ViewChildren ("idDiv") idDiv : QueryList<any>;//se le puso <Any> por que estaba con <ngmodel> y no se podia usar .nativeElement en el foreach
@Output() showParticipants = new EventEmitter<boolean>();
@Output() noneParticipants = new EventEmitter<string>();

  estaCheckeado = true;
  cardValue;
 msgUnblock = false;
 message:boolean = true;
 moveParticipants = '1';
 echo: Echo;
 roomCode;
 RoomID;
 VotingSessionCode;
 codigoSesion;
 
  constructor(private router:Router, 
    private elemento:ElementRef, 
    private render: Renderer2, 
    private unblockvoting : UnblockVotingService,
    private messageService : MessageService,
    public dataservice : DataService,
    private votesession : VoteSessionService,
    private cookie : CookieService
    )
    { 
   this.echo = this.messageService.websocket();
   this.roomCode = dataservice.Servicesrooms.RoomCode; 
   this.RoomID = dataservice.Servicesrooms.RoomID;
    }

  ngOnInit(): void {
  }

  alternarClass(event,id){
    this.idDiv.forEach(element => { 
      this.render.removeClass(element.nativeElement, "colorAzul");
      console.log(element);
    });
    event.target.classList.toggle('colorAzul');
    console.log(id.value);
  }
  presionar(){
    console.log(this.cardValue);
  }

  onblock(){
    //enviar RoomID para que se cree una sesion de votacion
    this.votesession.makeVotingSession(this.RoomID,this.cookie.get('cookie'))
    .subscribe(response =>{
      this.VotingSessionCode = response;
      this.codigoSesion = this.VotingSessionCode.VotingSessionCode;



      const socketsID = this.echo.socketId();
      this.noneParticipants.emit(this.moveParticipants);
      this.showParticipants.emit(this.message);//enviamos true para mostrar en el componente padre el boton y los participantes
  
      this.unblockvoting.unblockCarts(this.msgUnblock,this.codigoSesion,this.roomCode, socketsID)
      .subscribe( resp =>{
        console.log(resp);
      })  
    })

  }
}
