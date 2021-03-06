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

  websocket(): Echo{
     return new Echo ({
          
      broadcaster: 'pusher',
      key: environment.pusher_key,
      //wsHost: window.location.hostname,
      wsHost: 'localhost',
      cluster: environment.pusher_cluster,
      authEndpoint: `${ environment.urlBase }api/broadcasting/auth`,//esta ruta va autenticar por token
      auth:{
        headers:{
          Accept: 'application/json',
       //  Authorization: `Bearer ${this.cookieService.get(this.cookieService.get('token'))}`
         Authorization: `Bearer ${this.cookieService.get('token')}`
       }
    },
      wsPort: 6001,
     // forceTLS: true,
      disableStats: true,
     enabledTransports: ['ws']
    });
  };
  
}
