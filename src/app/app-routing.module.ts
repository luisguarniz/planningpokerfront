import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { HostInicioComponent } from './components/host-inicio/host-inicio.component';
import { HostResultsVotingComponent } from './components/host-results-voting/host-results-voting.component';
import { HostVotingComponent } from './components/host-voting/host-voting.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InvitedStartComponent } from './components/invited-start/invited-start.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full'},
  { path: 'start', component: InicioComponent },
  { path: 'hostStart', component: HostInicioComponent },
  { path: 'hostVoting', component: HostVotingComponent},
  { path: 'resultsVoting', component: HostResultsVotingComponent},
  { path: 'startInvited', component: InvitedStartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
