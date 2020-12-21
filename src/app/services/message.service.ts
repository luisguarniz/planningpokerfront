import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient) { }


  sendMessage() { //message: string
    const url = `${environment.urlWebsocket}api/MessageController/responseDate`;
   /*  const data = {    esta parte se necesitaria su nuestra consulta fuera POST por que necesitamos enviar algo
      message
    }; */
    return this.http.get(url); // "data" y tendriamos que asignar el valor aca para enviar un POST
  }

  websocket(): Echo{
     return new Echo ({

      broadcaster: 'pusher',
      key: 'ASD1234FG',
      wsHost: window.location.hostname,
      cluster: 'mt1',
      authEndpoint: `${environment.urlBase}api/broadcasting/auth`,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws']
    });
  };
  
  
}
