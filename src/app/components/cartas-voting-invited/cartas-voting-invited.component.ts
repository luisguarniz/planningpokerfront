import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { UnblockVotingService } from 'src/app/services/unblock-voting.service';
import { VoteSessionService } from 'src/app/services/vote-session.service';

@Component({
  selector: 'app-cartas-voting-invited',
  templateUrl: './cartas-voting-invited.component.html',
  styleUrls: ['./cartas-voting-invited.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartasVotingInvitedComponent implements OnInit {

  @ViewChildren("idDiv") idDiv: QueryList<any>;//se le puso <Any> por que estaba con <ngmodel> y no se podia usar .nativeElement en el foreach
  @ViewChildren("idDiv1") idDiv1: QueryList<any>;
  @Input() VotingSessionCode;

  msgUnblock;
  estaCheckeado = true;
  invitado;
  sesioncodigo;
  token;
  cookieExists;
  cookieidUser;
  echo;
  ponerColorPlomo;
  ponerquitar;
  tabExplorator;
  msgvoto = true;
  admin;

  constructor(private router: Router,
    private render: Renderer2,
    private dataservice: DataService,
    private votesessionservice: VoteSessionService,
    private cookie: CookieService,
    private activatedroute: ActivatedRoute,
    private messmessageservice: MessageService,
    private unblockvotingservice: UnblockVotingService
  ) {
    this.token = this.cookie.get("token");
    this.echo = messmessageservice.websocket();
    this.ponerquitar = false;
  }

  ngOnInit(): void {


    this.invitado = this.dataservice.Serviceinvited;

    this.echo.private(`room.${this.activatedroute.snapshot.paramMap.get("room")}`)
      .listen('messageTest', (resp) => {
        this.VotingSessionCode = resp.response.codigoSesion;
        this.ponerquitar = resp.response.msgUnblock;
        this.admin = resp.response.from.AdminUserCode;

        //quitar bloqueo de cartas
        if (this.ponerquitar == false) {
          this.idDiv1.forEach(element => {
            this.render.removeClass(element.nativeElement, "div-boquearCartas");
          });
        }

      });

    //evento para limpiar las cartas marcadas para volver a votar
    this.echo.private(`room.${this.activatedroute.snapshot.paramMap.get("room")}`)
      .listen('gameEvent', (resp) => {
        console.log(resp);
        this.ponerColorPlomo = resp.response.msgtrue;

        //pone  bloqueo de cartas
        if (this.ponerColorPlomo == true) {


          this.idDiv1.forEach(element => {
            this.render.addClass(element.nativeElement, "div-boquearCartas");
          });
        }
        if (this.ponerColorPlomo == true) {
          this.idDiv.forEach(element => {
            this.render.removeClass(element.nativeElement, "colorAzul");
            console.log(element + " " + this.invitado.id + " " + this.VotingSessionCode);
          });
        }
      });


  }

  alternarClass(event, id) {

    this.cookie.set('UserID', JSON.stringify(this.invitado.id));
    if (this.comprobarCookie()) {
      this.cookieidUser = this.cookie.get('UserID');

      this.votesessionservice
        .desactivateVote(this.cookieidUser)
        .subscribe((response) => {
          // respose responde null por que no envio nada desde LARAVEL
        });
    }

    const socketsID = this.echo.socketId();

    this.unblockvotingservice.changeIcon(this.msgvoto, this.admin, socketsID).subscribe((resp) => {
      console.log(resp);
    });



    //registramos carta seleccionada
    this.votesessionservice.makeVote(this.VotingSessionCode, this.invitado.id, id.value, this.token).subscribe((resp) => {
      console.log(resp);
    });

    //pintamos solo la carta elegida
    this.idDiv.forEach(element => {
      this.render.removeClass(element.nativeElement, "colorAzul");
      console.log(element + " " + this.invitado.id + " " + this.VotingSessionCode);
    });
    event.target.classList.add('colorAzul');
    console.log(id.value);
  }


  comprobarCookie() {
    this.cookieExists = this.cookie.check('UserID'); //preguntar si esta cookie existe
    return this.cookieExists;
  }

}
