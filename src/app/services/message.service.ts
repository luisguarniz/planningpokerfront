import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  websocket(){
    const echo = new Echo ({

      broadcaster: 'pusher',
      key: 'ASD1234FG',
      wsHost: window.location.hostname,
      cluster: 'mt1',
      authEndpoint: `${environment.urlBase}broadcasting/auth`,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws']
    });
    echo.channel('channel-message')
    .listen('MessageEvent', (resp) => {
      console.log(resp);
    });
  }
}
