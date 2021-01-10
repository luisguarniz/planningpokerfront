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

  constructor( public messageService :MessageService) 
  { 
   this.echo = messageService.websocket();
  }

  ngOnInit(): void {
    this.echo.private('channel-test')
    .listen('messageTest', (resp) => {//.MessageEvent
      console.log(resp);
    });

    //manejo de los usuarios que se unen a nuestro canal
    this.echo.join('channel-test')
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