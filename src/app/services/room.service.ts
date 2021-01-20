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

  getRoom(NameUsuario:any , idAdmin:any, token:any): Observable<Room[]>{

    const url = `${environment.urlBase}api/Room/makeRoom`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${ token }`
    });

    const data = {
      NameUsuario,
      idAdmin,
      token
    };
    
    
    return this._http.post<Room[]>(url,data,{headers}); //este return devuelve lo que obtuvo el get de HttpClient
  }

  desactivateRoom(idAdmin:any): Observable<any>{
    const url = `${environment.urlBase}api/Room/desactivateRoom`;
    const data = {
      idAdmin
    }
    return this._http.put<any>(url,data);
  }

}
