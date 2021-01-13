import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  meName;
  @Input() userList: User[] = [];
  @Input() starVoting: boolean; // esta variable viajo desde el componente hermano cartas al presionar el boton
  @Input() moveParticipants: string; // esta variable viajo desde el componente hermano cartas al presionar el boton

  constructor(private cookie : CookieService) { 

  }

  ngOnInit(): void {
    this.meName = this.cookie.get('NameUsuario');
  }

}
