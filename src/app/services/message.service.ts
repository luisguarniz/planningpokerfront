import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient, public cookieService : CookieService) { }


  sendMessage() { //message: string
    const url = `${environment.urlWebsocket}api/MessageController/responseDate`;
   /*  const data = {    esta parte se necesitaria su nuestra consulta fuera POST por que necesitamos enviar algo
      message
    }; */
    return this.http.get(url); // "data" y tendriamos que asignar el valor aca para enviar un POST
  }

  websocket(): Echo{
     return new Echo ({
          
      broadcaster: 'pusher',//si usara laravel-websocket seria api/broadcasting/auth 
      key: '751102ec3003a62331c0',
     // wsHost: window.location.hostname,
      cluster: 'mt1',
     //authEndpoint: 'pusher/auth',
     // authEndpoint: 'broadcasting/auth',
     // auth:{
    //    headers:{
      //    Accept: 'application/json',
      //    Authorization: `Bearer ${this.cookieService.get(this.cookieService.get('cookie'))}`
       // }
     // },
     authEndpoint: `${environment.urlWebsocket}api/broadcasting/auth`,//cuando modifico aca me lanza el error 500
     // wsPort: 6001,
      forceTLS: true,
     // disableStats: true,
     // enabledTransports: ['ws']
    });
  };
  
}
