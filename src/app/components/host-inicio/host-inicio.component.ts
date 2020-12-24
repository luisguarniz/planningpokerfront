import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-host-inicio',
  templateUrl: './host-inicio.component.html',
  styleUrls: ['./host-inicio.component.css']
})
export class HostInicioComponent implements OnInit {
  private echo ;
  constructor( public messageService :MessageService ) 
  { 
   this.echo = messageService.websocket();
  }

  ngOnInit(): void {

    this.echo.private('channel-message')
    .listen('MessageEvent', (resp) => {//.MessageEvent
      console.log(resp);
    });
  }

}
