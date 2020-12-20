import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-btn-start-feedback',
  templateUrl: './btn-start-feedback.component.html',
  styleUrls: ['./btn-start-feedback.component.css']
})
export class BtnStartFeedbackComponent implements OnInit {

  public inputMessage;
  public respuestaWS;
  constructor(private router:Router , private messageService : MessageService) { }

  ngOnInit(): void {
    
  }

  navegarStopVoting(){
    this.router.navigate(["/hostVoting"]);
  }

  sendMessage(){
    console.log(this.inputMessage);

    this.messageService.sendMessage(this.inputMessage)
    .subscribe( resp => {
      console.log(resp);
      this.respuestaWS = resp;
    });
  }
}
