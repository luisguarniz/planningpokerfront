import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from './login';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private __http : HttpClient) { }

  getUser(){
   const url = `${environment.urlBase}api/User/makeUser`;
   return this.__http.get(url);//<User[]> indica que el get (osea lo que traiga del backend) va ser de tipo User
}

  login(NameUsuario:string , password:string){
    const url = `${environment.urlBase}api/User/loginHost`;

    const data = {
      NameUsuario,
      password
    };

    return this.__http.post(url,data);
  }

}