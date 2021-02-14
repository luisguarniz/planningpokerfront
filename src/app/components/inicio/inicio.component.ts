import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { RoomService } from '../../services/room.service';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import Echo from 'laravel-echo';
import { UserService } from 'src/app/services/user.service';
import { InvitedService } from 'src/app/services/invited.service';
import { InvitedRoom } from 'src/app/services/invited-room';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  token: any;
  echo: Echo;
  user;
  userC;
  invited;
  rooms;
  AdminUserCode: any;
  AdmId: any;
  cookieExists: boolean;
  cookieidAdmin: any;
  existOrNotCookie: any;
  NameUsuario: string;
  password: any = '12345678'; //password fijo
  admCode: any;
  idRoom; //esta variable toma el valor del input text
  RoomNameI;
  RoomCodeI;

  public _prevSelected: any;
  public colorCheck;
  public inputMessage;
  constructor(
    private router: Router,
    public _RoomService: RoomService,
    private dataservice: DataService,
    private cookie: CookieService,
    public messageservice: MessageService,
    public userservice: UserService,
    public invitedservice: InvitedService
  ) {}

  ngOnInit(): void {
    this.colorCheck = true;
    this.cookieExists = this.cookie.check('idAdmin');
  }

  navegarStartInvited() {
    this.router.navigate(['/startInvited']);
  }

  manageRoom() {
    this.existOrNotCookie = this.comprobarCookie();

    if (this.existOrNotCookie) {
      this.cookieidAdmin = this.cookie.get('idAdmin');

      this._RoomService
        .desactivateRoom(this.cookieidAdmin)
        .subscribe((response) => {
          // respose responde null por que no envio nada desde LARAVEL
        });
    }

    this.userservice.getUser().subscribe((response) => {
      this.userC = response;

      //el password siempre es 12345678
      this.userservice
        .login(this.userC.user.NameUsuario, this.password)
        .subscribe((response: any) => {
          this.cookie.set('token', response.token);
          this.cookie.set('user', JSON.stringify(response.user));
          this.user = response;
          this.dataservice.idAdmin = this.user.user.AdminUserCode;

          //ya teniendo los datos del Host entonces creamos la sala hay un objeto dentro del JSON por eso se accede de esta manera
          this._RoomService
            .getRoom(
              this.user.user.NameUsuario,
              this.user.user.id,
              this.user.user.token
            )
            .subscribe((response) => {
              this.rooms = response;
              this.dataservice.Servicesrooms = this.rooms; // ahora asigno los valores a la variable Servicesrooms que esta en el servicio DataService
              this.cookie.set('idAdmin', JSON.stringify(this.rooms.idAdmin)); //creo una cookie con el nombre'AdminUserCode' y con el contenido de mi variable AdminUserCode
              this.router.navigate([`/hostStart/${this.dataservice.Servicesrooms.RoomCode}`]);
            });
        });
    });
  }
  comprobarCookie() {
    this.cookieExists = this.cookie.check('idAdmin'); //preguntar si esta cookie existe
    return this.cookieExists;
  }

  manageInvited() {
    
    this._RoomService.getRoomInvited(this.idRoom).subscribe((resp:InvitedRoom) => {
      this.dataservice.InvitedRoom = resp;
   });

    this.dataservice.clave = this.idRoom;

    this.invitedservice.getInvited().subscribe((response) => {
      this.user = response;
      this.dataservice.Serviceinvited = this.user.user;

      this.cookie.set('NameUsuario', this.user.user.NameUsuario);
      this.cookie.set('token', this.user.token); // creando un token aca se soluciona el bug de autenticar la primera vez que se une

      //el password siempre es 12345678
      this.userservice
        .login(this.user.user.NameUsuario, this.password)
        .subscribe((response: any) => {
          this.cookie.set('token', response.token);
          this.cookie.set('user', JSON.stringify(response.user));
          this.user = response;
        });
        
      this.router.navigate([`/startInvited/${this.idRoom}`]);
    });
  }
}
