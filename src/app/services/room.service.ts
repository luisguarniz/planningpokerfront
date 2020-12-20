import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Room } from './room';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

 
  constructor(private _http : HttpClient) { }

  getRoom(): Observable<Room[]>{
    const url = `${environment.urlBase}Room/makeRoom`;
                                  //this.URL+'makeRoom'
    return this._http.get<Room[]>(url);
    
  }

  desactivateRoom(id:any): Observable<any>{
    const url = `${environment.urlBase}Room/deactivateRoom/`;
                          //this.URL+'deactivateRoom/'
    return this._http.get(url+id);//revisar estos conceptos. por que angular seguro no deja poner como argumento un id cuando es de tipo get
  }

}
