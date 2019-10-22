import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable({ providedIn: 'root' })
//vai servir para proibir acesso a rotas sem autenticação obrigatoria
export class AuthGuard implements CanActivate{

  constructor(
    private router: Router,
    private authenticationService: AutenticacaoService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
      //usuario logado
      return true;
    }

    this.router.navigate(['/login']), { queryParams: { returnUrl: state.url } };
    return false;
  }

}
