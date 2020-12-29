import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private __http : HttpClient) { }

  getUser(): Observable<User[]>{
   const url = `${environment.urlBase}User/makeUser`;
   return this.__http.get<User[]>(url);//<User[]> indica que el get (osea lo que traiga del backend) va ser de tipo User
}
}