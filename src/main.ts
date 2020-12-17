import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//este archivo main.ts es es el primer archivo que se ejecuta cuando carga la pagina y a su ves ejecuta AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
