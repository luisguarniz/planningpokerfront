import { Injectable } from '@angular/core';
import { Room } from './room';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  Servicesrooms : Room;
  Servicesuser : User;
  constructor() { }


}
