import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class InvitedService {

  constructor(private __http : HttpClient) { }

  getInvited(): Observable<User[]>{
    const url = `${environment.urlBase}api/User/makeInvited`;
    return this.__http.get<User[]>(url);
  }
}