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
  unblockCarts(msgUnblock: Boolean, to: any, socketsID){

    const url = `${environment.urlBase}api/Message/unblock`;
    const headers = new HttpHeaders({  //la constante es importante que se llame headers por que asi pide HttpHeaders que sea
      Authorization : `Bearer ${this.cookie.get('token')}`,
      'X-Socket-ID': socketsID
    });
    const data = {
      msgUnblock,
      to
    }
   return this.http.post(url, data, {headers});
  }
}
