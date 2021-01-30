import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  mostrarDivCartas : boolean = false;
  ListaVotos: [];

 // roomCode:any; //enviar este codigo para distinguir las salas creadas
  constructor( public messageService :MessageService, public dataservice : DataService, private activatedRoute : ActivatedRoute) 
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
  showDiv(mensajeEvento){
 this.mostrarDivCartas = mensajeEvento;
  }

  ShowListVotos(ListVotos){
    this.ListaVotos = ListVotos;
  }

  ngOnInit(): void {
   this.echo.private(`room.${this.activatedRoute.snapshot.paramMap.get("room")}`)
    .listen('messageTest', (resp) => {
      console.log(resp);
    });


    //manejo de los usuarios que se unen a nuestro canal
  this.echo.join(`room.${this.activatedRoute.snapshot.paramMap.get("room")}`)
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