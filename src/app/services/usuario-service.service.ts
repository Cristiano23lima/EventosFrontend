import { Usuarios } from './../models/usuarios.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient ) { }

  RegisterUser(username: string, password: string, name: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('password', password);
    params = params.append('name', name);

    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json');

    return this.http.post<any>(`${environment.apiUrl}/usuario`, params, {headers});
  }

}
