import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/services/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invited-start',
  templateUrl: './invited-start.component.html',
  styleUrls: ['./invited-start.component.css'],
})
export class InvitedStartComponent implements OnInit {
  private echo;

  ponerquitar;
  VotingSessionCode
  userList: User[] = [];

  constructor(
    public messageService: MessageService,
    public dataservice: DataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.echo = messageService.websocket();
  }

  ngOnInit(): void {
    console.log(this.dataservice.clave);

    this.ponerquitar = true;

    // this.echo.private(`channel-test${this.dataservice.clave}`)
       this.echo.private(`room.${this.activatedRoute.snapshot.paramMap.get("room")}`)
       .listen('messageTest', (resp) => {
       this.VotingSessionCode = resp.response.codigoSesion
       console.log(this.VotingSessionCode);
       this.ponerquitar = resp.response.message;
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
