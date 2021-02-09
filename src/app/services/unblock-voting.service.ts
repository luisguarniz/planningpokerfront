import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnblockVotingService {

  constructor(private http : HttpClient, private cookie:CookieService) { 
  }
  unblockCarts(msgUnblock: Boolean,codigoSesion:any,to: any, socketsID){

    const url = `${environment.urlBase}api/Message/unblock`;
    const headers = new HttpHeaders({  //la constante es importante que se llame headers por que asi pide HttpHeaders que sea
      Authorization : `Bearer ${this.cookie.get('token')}`,
      'X-Socket-ID': socketsID
    });
    const data = {
      msgUnblock,
      codigoSesion,
      to
    }
   return this.http.post(url, data, {headers});
  }

  changeIcon(msgvoto: Boolean,to: any, socketsID){

    const url = `${environment.urlBase}api/Message/changeIcon`;
    const headers = new HttpHeaders({
      Authorization : `Bearer ${this.cookie.get('token')}`,
      'X-Socket-ID': socketsID
    });
    const data = {
      msgvoto,
      to
    }
   return this.http.post(url, data, {headers});
  }
}
