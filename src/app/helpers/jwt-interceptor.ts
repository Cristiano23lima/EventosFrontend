import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
export class JwtInterceptorService {

  constructor(private authenticationService: AutenticacaoService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationService.currentUserValue;
    let acesso = sessionStorage.getItem('token_acesso');

    if (currentUser && currentUser.access_token && acesso != 'nao') {
        //se a autenticação ocorreu ele adiciona no header o token jwt para o usuario ter acesso as rotas
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.access_token}`
            }
        });
    }

    sessionStorage.setItem('token_acesso', 'sim');
    return next.handle(request);
  }
}
