import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteSessionService {

  constructor(private _http: HttpClient, private cookie: CookieService) { 

  }

  makeVotingSession(RoomID:any,token:any){
    const url = `${environment.urlBase}api/Votingsession/makeVotingSession`;
    const data = {
      RoomID
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${ token }`
    });
   return this._http.post(url,data,{headers});
  }

  makeVote(VotingSessionCode,UserID,vote,token){
    const url = `${environment.urlBase}api/Votingsession/makeVote`;
    const data = {
      VotingSessionCode,
      UserID,
      vote
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${ token }`
    });
   return this._http.post(url,data,{headers});
  }


  desactivateVote(UserID:any): Observable<any>{
    const url = `${environment.urlBase}api/Votingsession/desactivateVote`;
    const data = {
      UserID
    }
    return this._http.put<any>(url,data);
  }

  getVotingSession(VotingSessionCode:any) {
    const url = `${environment.urlBase}api/Votingsession/getVotingSession/`;
    return this._http.get(url + VotingSessionCode);
  }

  limpiarCartas(msgtrue: Boolean,to: any, socketsID){

    const url = `${environment.urlBase}api/Votingsession/limpiarCartas`;
    const headers = new HttpHeaders({ 
      Authorization : `Bearer ${this.cookie.get('token')}`,
      'X-Socket-ID': socketsID
    });
    const data = {
      msgtrue,
      to
    }
   return this._http.post(url, data, {headers});
  }
}
