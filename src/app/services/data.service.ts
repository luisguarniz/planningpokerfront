import { Injectable } from '@angular/core';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  Servicesrooms : Room;
  constructor() { }
}
