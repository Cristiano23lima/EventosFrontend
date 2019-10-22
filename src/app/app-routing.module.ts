import { ViewEventosComponent } from './components/view-eventos/view-eventos.component';
//ROTAS-DA-APLICAÇÃO
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesListagemComponent } from './components/clientes-listagem/clientes-listagem.component';
import { AutenticacaoComponent } from './components/autenticacao/autenticacao.component';
import { HomeComponent } from './components/home/home.component';
import { EventosComponent } from './components/eventos/eventos.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesListagemComponent },
  {path: 'login', component: AutenticacaoComponent },
  {path: '', component: HomeComponent },
  {path: 'eventos', component: EventosComponent },
  {path: 'eventos/:slug', component: ViewEventosComponent },
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
