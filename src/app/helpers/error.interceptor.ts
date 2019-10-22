import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
//captura erros de rotas nao autorizadas fazendo o logout do usuario automaticamente da aplicação
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AutenticacaoService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // faz o logout automatico caso a resposta da api seja 401
                this.authenticationService.logout();
                location.reload(true);
            }else if(err.status === 400){
                err.error.message = "Email ou senha inválidos.";
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
