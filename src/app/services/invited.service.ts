import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invited } from './invited';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class InvitedService {

  constructor(private __http : HttpClient) { }

  getInvited(): Observable<Invited[]>{
    const url = `${environment.urlBase}api/User/makeInvited`;
    return this.__http.get<Invited[]>(url);
  }
}