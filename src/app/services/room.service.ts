import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from './room';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

 //HttpClient es un cliente con los métodos REST habituales(get,post,put etc), que está basado en Observables. Básicamente es lo que vas a utilizar
 //para hacer llamadas a una API REST y obtener resultados de la misma. ... Devuelve cold observables.
  constructor(private _http : HttpClient) { }

  getRoom(NameUsuario:any , AdminUserCode:any, token:any): Observable<Room[]>{

    const url = `${environment.urlBase}Room/makeRoom`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${ token }`
    });

    const data = {
      NameUsuario,
      AdminUserCode,
      token
    };
    
    
    return this._http.post<Room[]>(url,data,{headers}); //este return devuelve lo que obtuvo el get de HttpClient
  }

  desactivateRoom(id:any): Observable<any>{
    const url = `${environment.urlBase}Room/deactivateRoom`;
    return this._http.put(url,id);//revisar estos conceptos. por que angular seguro no deja poner como argumento un id cuando es de tipo get
  }

}
