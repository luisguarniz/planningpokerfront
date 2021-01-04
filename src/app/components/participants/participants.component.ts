import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
 public invitedName? = "-";
 public hostName = "*";

  constructor(public dataservice: DataService) { 

  }

  ngOnInit(): void {
    this.hostName = this.dataservice.Servicesuser.NameUsuario;
    this.invitedName = this.dataservice.Serviceinvited.nameInvited; // si defino esta variable en el constructor. Mi aplicacion no mostraria nada por el error ni siquiera pasara ala pantalla de inicio del host
                                                                    // encontrar la manera de solucionar el error core.js:4352 ERROR TypeError: Cannot read property 'nameInvited' of undefined
  }

}
