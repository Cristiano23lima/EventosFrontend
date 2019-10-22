import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService } from './services/autenticacao.service';
import { Usuarios } from './models/usuarios.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: Usuarios;

  constructor(
    private router: Router,
    private authenticationService: AutenticacaoService
  ){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  title = 'f5 promotora eventos';
}
