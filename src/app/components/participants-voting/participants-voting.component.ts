import { Component, Input, OnInit,ViewContainerRef } from '@angular/core';
import { Adcomponent } from 'src/app/services/adcomponent';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/services/user';
import { VoteSessionService } from 'src/app/services/vote-session.service';

@Component({
  selector: 'app-participants-voting',
  templateUrl: './participants-voting.component.html',
  styleUrls: ['./participants-voting.component.css'],
})
export class ParticipantsVotingComponent implements OnInit , Adcomponent{
   @Input() listParticipants: [] = [];
  showIconClock: boolean = true;
  echo;
  idAdmin;
  userListVoting: any = [];
  msgchange = false;
  constructor(
    public viewcontainerref:ViewContainerRef,
    private messageService: MessageService,
    private dataservice: DataService,
    private votesessionservice: VoteSessionService
  ) {
    this.idAdmin = this.dataservice.idAdmin;
    this.echo = messageService.websocket();
  }

  ngOnInit(): void {
    console.log(this.listParticipants);
    console.log("this.listParticipants");
    this.echo
      .private(`votation.${this.idAdmin}`)
      .listen('changeState', (resp: any) => {
        console.log(resp);
      var nombreParticipante = resp.response.from.NameUsuario;
        this.changeIcon(this.listParticipants,nombreParticipante);
      });
  }

  changeIcon(listParticipants:any,nombreParticipant:any){

    for (let index = 0; index < listParticipants.length; index++) {
      console.log("repeticiones igual al tama;o del array");
      if (listParticipants[index]["NameUsuario"] == nombreParticipant ) {
        listParticipants[index]["vote"] = "1";
      }  
    }

  }


}
