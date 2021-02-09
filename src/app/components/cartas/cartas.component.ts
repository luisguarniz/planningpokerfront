import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ComponentFactoryResolver
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Echo from 'laravel-echo';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { UnblockVotingService } from 'src/app/services/unblock-voting.service';
import { User } from 'src/app/services/user';
import { VoteSessionService } from 'src/app/services/vote-session.service';
import { ParticipantsVotingComponent } from 'src/app/components/participants-voting/participants-voting.component';
import { DynamicHostDirective } from 'src/app/directive/dynamic-host.directive';
import { Adcomponent } from 'src/app/services/adcomponent';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css'],
})
export class CartasComponent implements OnInit {
  @ViewChildren('idDiv') idDiv: QueryList<any>; //se le puso <Any> por que estaba con <ngmodel> y no se podia usar .nativeElement en el foreach
  @Output() showParticipants = new EventEmitter<boolean>();
  @Output() noneParticipants = new EventEmitter<string>();
  @Input() mostrarDivCartas: boolean;
  @Input() userList: User[] = [];
  @Output() showDiv = new EventEmitter<boolean>();
  @Output() ListaVotosEmit = new EventEmitter<any>();
  @ViewChild(DynamicHostDirective) public dynamichost:DynamicHostDirective;

  estaCheckeado = true;
  cardValue;
  msgUnblock = false;
  message: boolean = true;
  moveParticipants = '1';
  echo: Echo;
  roomCode;
  RoomID;
  VotingSessionCode;
  codigoSesion;
  OcultarBtn: boolean = true;
  mostrarDiv: boolean = true;
  ListaVotos;
  msgtrue = true;
  listParticipants:[] = [];

  constructor(
    private router: Router,
    private elemento: ElementRef,
    private render: Renderer2,
    private unblockvoting: UnblockVotingService,
    private messageService: MessageService,
    public dataservice: DataService,
    private votesession: VoteSessionService,
    private cookie: CookieService,
    private votesessionservice: VoteSessionService,
    private componentfactoryresolver : ComponentFactoryResolver
  ) {
    this.echo = this.messageService.websocket();
    this.roomCode = dataservice.Servicesrooms.RoomCode;
    this.RoomID = dataservice.Servicesrooms.RoomID;
    this.ListaVotos = [];
  }

  ngOnInit(): void {}

  //creo la votacion. Debo cambiar el nombre de esta funcion para que indique que es el proceso de crear votacion
  onblock() {

    

    //enviar RoomID para que se cree una sesion de votacion
    this.votesession
      .makeVotingSession(this.RoomID, this.cookie.get('cookie'))
      .subscribe((response) => {
        this.VotingSessionCode = response;
        this.codigoSesion = this.VotingSessionCode.VotingSessionCode;
        this.dataservice.VotingSessionCode = this.VotingSessionCode.VotingSessionCode; //guardo el codigo de session para usarlo en la consulta de los que an botado

        this.consultarVotos(this.codigoSesion);
        //console.log("listParticipants");
        //console.log(this.listParticipants);
        

        const socketsID = this.echo.socketId();
        this.noneParticipants.emit(this.moveParticipants);
        this.showParticipants.emit(this.message); //enviamos true para mostrar en el componente padre el boton y los participantes

        this.unblockvoting
          .unblockCarts(
            this.msgUnblock,
            this.codigoSesion,
            this.roomCode,
            socketsID
          )
          .subscribe((resp) => {
            console.log(resp);
          });
      });
    this.mostrarDivCartas = false;
    this.OcultarBtn = false;
    
  }

  resultVoting() {
    this.showDiv.emit(this.mostrarDiv);
    this.VotingSessionCode = this.dataservice.VotingSessionCode;
    console.log("VotingSessionCode");
    console.log(this.VotingSessionCode);
    this.votesessionservice
      .getVotingSession(this.VotingSessionCode)
      .subscribe((response) => {
        this.ListaVotos = response;
        console.log(response);
        this.ListaVotosEmit.emit(this.ListaVotos);
      });

    const socketsID = this.echo.socketId();

    this.votesessionservice
      .limpiarCartas(this.msgtrue, this.roomCode, socketsID)
      .subscribe((resp) => {
        console.log(resp);
      });

    this.OcultarBtn = true;
    this.mostrarDivCartas = true;
  }

  consultarVotos(VotingSessionCode) {//poniendo el metodo directo arriba si devuelve la respuesta del servidor
    let listParticipants: any = [];
    let i = 0;
    let promisePaticipants;

    while (i < this.userList.length) {
      if (this.userList[i].isInvited == "1") {
        var votes: any = {
          VotingSessionCode: VotingSessionCode,
          UserID: this.userList[i].id,
          vote: null,
        };
        listParticipants.push(votes); // lleno este arreglo con objetos
      }
      i++;
    }
    //return listParticipants;
   // jsonList = JSON.stringify(listParticipants);
   promisePaticipants = this.votesessionservice
      .setVotingParticipants(listParticipants)// paso como parametro el arreglo de objetos
      .subscribe((response) => {
        //console.log(response);
        this.crearComponentParticipants(response);
      });

      return promisePaticipants;
  }

  crearComponentParticipants(listParticipants){
    const component = this.componentfactoryresolver.resolveComponentFactory(ParticipantsVotingComponent);

    const viewContainerRef = this.dynamichost.viewcontainerref;

    this.dynamichost.viewcontainerref.clear();
    const componentRef = viewContainerRef.createComponent<Adcomponent>(component);//parece que se tiene que crear una interface
    //para poder usar component.instance.variableEnviare = 
    componentRef.instance.listParticipants = listParticipants;
}
}