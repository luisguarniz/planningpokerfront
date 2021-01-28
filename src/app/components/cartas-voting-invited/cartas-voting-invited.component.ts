import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChildren, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { VoteSessionService } from 'src/app/services/vote-session.service';

@Component({
  selector: 'app-cartas-voting-invited',
  templateUrl: './cartas-voting-invited.component.html',
  styleUrls: ['./cartas-voting-invited.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartasVotingInvitedComponent implements OnInit, OnChanges {

  @ViewChildren ("idDiv") idDiv : QueryList<any>;//se le puso <Any> por que estaba con <ngmodel> y no se podia usar .nativeElement en el foreach
  @Input() VotingSessionCode;
  //@Input() ponerColorPlomo;
  
  msgUnblock;
  estaCheckeado = true;
  invitado;
  sesioncodigo;
  token;
  cookieExists;
  cookieidUser;
  echo;
 //botonImprimir = false;
// resetColor;
  ponerColorPlomo;
  
 
  constructor(private router:Router, 
    private elemento:ElementRef, 
    private render: Renderer2, 
    private dataservice : DataService,
    private votesessionservice : VoteSessionService,
    private cookie : CookieService,
    private activatedroute : ActivatedRoute,
    private messmessageservice : MessageService
    ) {
         this.token = this.cookie.get("token");
         this.echo = messmessageservice.websocket();
     }

  ngOnInit(): void {
    this.invitado = this.dataservice.Serviceinvited;
   
  // console.log("el calor de reset color es :"+this.resetColor);

  }

ngOnChanges(){

    //evento para limpiar las cartas marcadas para volver a votar
    this.echo.private(`room.${this.activatedroute.snapshot.paramMap.get("room")}`)
    .listen('gameEvent', (resp) => {
      console.log(resp);
      console.log("verdadero o falso en la variable mensaje web soket "+resp.response.msgtrue);
     this.ponerColorPlomo = resp.response.msgtrue;

     if (this.ponerColorPlomo == true) {
      this.idDiv.forEach(element => { 
        this.render.removeClass(element.nativeElement, "colorAzul");
        console.log(element+" "+this.invitado.id+" "+ this.VotingSessionCode);
      });
    }
 });

}

  alternarClass(event,id){

    this.cookie.set('UserID', JSON.stringify(this.invitado.id));
    if (this.comprobarCookie()) {
      this.cookieidUser = this.cookie.get('UserID');

      this.votesessionservice
        .desactivateVote(this.cookieidUser)
        .subscribe((response) => {
          // respose responde null por que no envio nada desde LARAVEL
        });
    }

       //aca enviamos un mensaje a un metodo en el back que llame al canal q estamos conectados

    //registramos carta seleccionada
    this.votesessionservice.makeVote(this.VotingSessionCode,this.invitado.id,id.value,this.token).subscribe((resp) =>{
      console.log(resp);
     });

     //pintamos solo la carta elegida
    this.idDiv.forEach(element => { 
      this.render.removeClass(element.nativeElement, "colorAzul");
      console.log(element+" "+this.invitado.id+" "+ this.VotingSessionCode);
    });
    event.target.classList.add('colorAzul');
    console.log(id.value);
  }


  comprobarCookie() {
    this.cookieExists = this.cookie.check('UserID'); //preguntar si esta cookie existe
    return this.cookieExists;
  }

}
