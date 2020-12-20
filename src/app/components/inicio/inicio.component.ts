import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { RoomService } from '../../services/room.service';
import { Room } from '../../services/room'
import { JsonpClientBackend } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import Echo from 'laravel-echo';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  echo : Echo;
  rooms ;
  AdminUserCode: any;
  cookieExists: boolean;
  cookieAdminUserCode:any;
  existOrNotCookie
  constructor( private router : Router, public _RoomService: RoomService, private dataservice: DataService, private cookie: CookieService, public messageservice: MessageService) 
  { 
    this.echo = this.messageservice.websocket();
  }

  ngOnInit(): void {
    console.log("mensaje al cargar");
    
    this.echo.channel('channel-message')
    .listen('MessageEvent', (resp) => {
      console.log(resp);
    });
  }

  navegarInicioHost(){
    this.router.navigate(["/hostStart"]);
  }
  navegarStartInvited(){
    this.router.navigate(['/startInvited']);
  }

  //con este metodo traemos los datos desde Laravel
  manageRoom(){


    this.existOrNotCookie = this.comprobarCookie();
    
    if(this.existOrNotCookie){
      this.cookieAdminUserCode = this.cookie.get('AdminUserCode');
     this._RoomService.desactivateRoom(this.cookieAdminUserCode).subscribe(response=>{
       // respose responde null por que no envio nada desde LARAVEL
     });
     
    }
     this._RoomService.getRoom().subscribe( response =>{

      this.rooms = response;
      this.dataservice.Servicesrooms = this.rooms; // ahora asigno los valores a la variable Servicesrooms que esta en el servicio DataService
      this.AdminUserCode = this.dataservice.Servicesrooms.AdminUserCode;
    
      this.cookie.set('AdminUserCode',this.AdminUserCode);//creo una cookie con el nombre'AdminUserCode' y con el contenido de mi variable AdminUserCode
      this.router.navigate(["/hostStart"]);
    
    })

  }
  comprobarCookie(){
    this.cookieExists = this.cookie.check('AdminUserCode'); //preguntar si esta cookie existe
    return this.cookieExists;
  }



}
