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
    const url = `${environment.urlBase}api/MessageController/responseDate`;
   /*  const data = {    esta parte se necesitaria su nuestra consulta fuera POST por que necesitamos enviar algo
      message
    }; */
    return this.http.get(url); // "data" y tendriamos que asignar el valor aca para enviar un POST
  }

  websocket(): Echo{
     return new Echo ({
          
      broadcaster: 'pusher',
      key: environment.pusher_key,
      wsHost: window.location.hostname,// wsHost: 'localhost:8000',
      cluster: environment.pusher_cluster,
 //     authEndpoint: `${ environment.urlBase }api/broadcasting/auth`,//esta ruta va autenticar por token
  //    auth:{
  //      headers:{
  //        Accept: 'application/json',
    //      Authorization: `Bearer ${this.cookieService.get(this.cookieService.get('token'))}`
   //     }
 //   },
      wsPort: 6001,
     // forceTLS: true,
      disableStats: true,
     enabledTransports: ['ws']
    });
  };
  
}
