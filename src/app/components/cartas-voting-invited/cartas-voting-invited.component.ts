import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { VoteSessionService } from 'src/app/services/vote-session.service';

@Component({
  selector: 'app-cartas-voting-invited',
  templateUrl: './cartas-voting-invited.component.html',
  styleUrls: ['./cartas-voting-invited.component.css']
})
export class CartasVotingInvitedComponent implements OnInit {

  @ViewChildren ("idDiv") idDiv : QueryList<any>;//se le puso <Any> por que estaba con <ngmodel> y no se podia usar .nativeElement en el foreach
  @Input() VotingSessionCode;
  
  msgUnblock;
  estaCheckeado = true;
  invitado;
  sesioncodigo;
  token;
 //botonImprimir = false;
 
  constructor(private router:Router, 
    private elemento:ElementRef, 
    private render: Renderer2, 
    private dataservice : DataService,
    private votesessionservice : VoteSessionService,
    private cookie : CookieService
    ) {
         this.token = this.cookie.get("token");
     }

  ngOnInit(): void {
    this.invitado = this.dataservice.Serviceinvited;
    console.log("el id del invitado es :" + this.invitado.id);
   // this.botonImprimir= this.msgUnblock;
  }

  alternarClass(event,id){
    //registramos carta seleccionada
    this.votesessionservice.makeVote(this.VotingSessionCode,this.invitado.id,id.value,this.token).subscribe((resp) =>{
      console.log(resp);
     });

     //pintamos solo la carta elegida
    this.idDiv.forEach(element => { 
      this.render.removeClass(element.nativeElement, "colorAzul");
      console.log(element+" "+this.invitado.id+" "+ this.VotingSessionCode);
    });
    event.target.classList.toggle('colorAzul');
    console.log(id.value);
  }
}
