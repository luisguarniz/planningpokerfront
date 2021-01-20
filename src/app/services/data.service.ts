import { Injectable } from '@angular/core';
import { Invited } from './invited';
import { Room } from './room';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  Serviceinvited : Invited;
  Servicesrooms : Room;
  Servicesuser : User;
  clave : string;
  VotingSessionCode : any;
  constructor() { }
}
