import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-host-inicio',
  templateUrl: './host-inicio.component.html',
  styleUrls: ['./host-inicio.component.css']
})
export class HostInicioComponent implements OnInit {
  private echo ;
  
  userList: User[] = [];
  starVoting: boolean = false;
  moveParticipants : string = '0';

 // roomCode:any; //enviar este codigo para distinguir las salas creadas
  constructor( public messageService :MessageService, public dataservice : DataService) 
  { 
   this.echo = messageService.websocket();
  // this.roomCode = dataservice.Servicesrooms.RoomCode;
  }
  processMoveParticipants(msg){
    this.moveParticipants = msg;
  }

  procesaPropagar(mensaje) {
    this.starVoting = mensaje;
  }

  ngOnInit(): void {
    
    this.echo.private('channel-test') //  this.echo.private(`channel-test.${this.roomCode}`)
    .listen('messageTest', (resp) => {
      console.log(resp);
    });
    //manejo de los usuarios que se unen a nuestro canal
    this.echo.join('channel-test')// this.echo.join(`channel-test.${this.roomCode}`)
    .here((users) => {
        console.log(users);
        this.userList = users;
    })
    .joining((user) => {
        this.userList.push(user);
    })
    .leaving((user) => {
        this.userList = this.userList.filter((userL) => {
          return user.id !== userL.id;
        });
    });

  }

}