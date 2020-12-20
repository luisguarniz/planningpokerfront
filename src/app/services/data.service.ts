import { Injectable } from '@angular/core';
import { Room } from './room';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  Servicesrooms : Room;
  constructor() { }


}
