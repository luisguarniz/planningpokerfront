import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { CartasComponent } from './components/cartas/cartas.component';
import { HostInicioComponent } from './components/host-inicio/host-inicio.component';
import { HostVotingComponent } from './components/host-voting/host-voting.component';
import { BtnStopVotingComponent } from './components/btn-stop-voting/btn-stop-voting.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { HostResultsVotingComponent } from './components/host-results-voting/host-results-voting.component';
import { BtnClearComponent } from './components/btn-clear/btn-clear.component';
import { CartasResultadoComponent } from './components/cartas-resultado/cartas-resultado.component';
import { InvitedStartComponent } from './components/invited-start/invited-start.component';
import { CartasVotingInvitedComponent } from './components/cartas-voting-invited/cartas-voting-invited.component';

import { HttpClientModule } from '@angular/common/http'; //esto sirve para poder hacer llamadas al servidor
import { FormsModule } from '@angular/forms';
import { ParticipantsVotingComponent } from './components/participants-voting/participants-voting.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabeceraComponent,
    CartasComponent,
    HostInicioComponent,
    HostVotingComponent,
    BtnStopVotingComponent,
    ParticipantsComponent,
    HostResultsVotingComponent,
    BtnClearComponent,
    CartasResultadoComponent,
    InvitedStartComponent,
    CartasVotingInvitedComponent,
    ParticipantsVotingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
