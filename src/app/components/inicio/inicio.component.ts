import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { RoomService } from '../../services/room.service';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import Echo from 'laravel-echo';
import { UserService } from 'src/app/services/user.service';
import { InvitedService } from 'src/app/services/invited.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  token : any;
  echo : Echo;
  user ;
  invited;
  rooms ;
  AdminUserCode: any;
  cookieExists: boolean;
  cookieAdminUserCode:any;
  existOrNotCookie:any;
  NameUsuario:any;
  admCode:any;
  NameInvited:any;

  public _prevSelected: any;
  public colorCheck;
  public inputMessage;
  constructor( private router : Router, public _RoomService: RoomService, private dataservice: DataService, private cookie: CookieService, public messageservice: MessageService, public userservice:UserService, public invitedservice: InvitedService) 
  { 

  }
  
  ngOnInit(): void {
    console.log("mensaje al cargar");
    this.colorCheck = true;
  }

  navegarInicioHost(){
    this.router.navigate(["/hostStart"]);
  }
  navegarStartInvited(){
    this.router.navigate(['/startInvited']);
  }

  manageRoom(){

    this.existOrNotCookie = this.comprobarCookie();
    
    if(this.existOrNotCookie){
      this.cookieAdminUserCode = this.cookie.get('AdminUserCode');
     this._RoomService.desactivateRoom(this.cookieAdminUserCode).subscribe(response=>{
       // respose responde null por que no envio nada desde LARAVEL
     });
    }

    this.userservice.getUser().subscribe( response =>{
      console.log(response);
       this.user = response;
       this.dataservice.Servicesuser = this.user;
       this.NameUsuario = this.dataservice.Servicesuser.NameUsuario;
       this.AdminUserCode = this.dataservice.Servicesuser.AdminUserCode;
       this.token = this.dataservice.Servicesuser.token;
       
       //ya teniendo los datos del Host entonces creamos la sala
       this._RoomService.getRoom(this.dataservice.Servicesuser.NameUsuario , this.dataservice.Servicesuser.AdminUserCode, this.dataservice.Servicesuser.token).subscribe( response =>{
        console.log(response);
        this.rooms = response;
        this.dataservice.Servicesrooms = this.rooms; // ahora asigno los valores a la variable Servicesrooms que esta en el servicio DataService
        this.cookie.set('AdminUserCode',JSON.stringify(this.dataservice.Servicesrooms.AdminUserCode));//creo una cookie con el nombre'AdminUserCode' y con el contenido de mi variable AdminUserCode
        this.cookie.set('token',JSON.stringify(this.dataservice.Servicesrooms.token));
        this.router.navigate(["/hostStart"]);
      
      });
      });
  }
  comprobarCookie(){
    this.cookieExists = this.cookie.check('AdminUserCode'); //preguntar si esta cookie existe
    return this.cookieExists;
  }

  
manageInvited(){
      this.invitedservice.getInvited().subscribe( response =>{
        console.log(response);
      this.invited = response;
      this.dataservice.Serviceinvited = this.invited;
      console.log(this.dataservice.Serviceinvited)
      this.router.navigate(["/hostStart"]);
  })
}
}
