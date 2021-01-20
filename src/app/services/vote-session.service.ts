import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteSessionService {

  constructor(private _http: HttpClient) { 

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
}
