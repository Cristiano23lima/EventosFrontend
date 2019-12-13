import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuarios } from '../models/usuarios.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private currentUserSubject: BehaviorSubject<Usuarios>;
  public currentUser: Observable<Usuarios>;

  usuario = {};


  constructor(private http: HttpClient){
    this.currentUserSubject = new BehaviorSubject<Usuarios>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.usuario = {};
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let params = new HttpParams();
    params = params.append('grant_type', 'password');
    params = params.append('username', username);
    params = params.append('password', password);

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('eventof5:eventof5_23'));
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');

    const body = params.toString();

    return this.http.post<any>(`${environment.apiUrl}/oauth/token`, body, {headers})
    .pipe(map(user => {
      // armazena uma sessão local para deixar o usuario logado com o token jwt durante navegação entre as rotas
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          sessionStorage.setItem('dataUser', JSON.stringify(username));
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  logout() {
    // remove o token salvo do usuario na sessão local
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
