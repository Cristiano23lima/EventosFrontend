import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) { }

  cadastroEvento(formGroup) {
    //verificar os dados de usuarios no backend(API REST)
    const headers = new HttpHeaders();
    headers.set('Content-type', 'multipart/form-data');

    const email = JSON.parse(sessionStorage.getItem('dataUser'));

    return this.http.post(`${environment.apiUrl}/evento/addEvento/${email}`, formGroup, {headers});
  }

  buscarEventosCadastrados(){
    const email = JSON.parse(sessionStorage.getItem('dataUser'));
    return this.http.get<any[]>(`${environment.apiUrl}/evento/listEventoUsuario/${email}`);
  }

  excluirEvento(id:any){
    return this.http.delete(`${environment.apiUrl}/evento/deleteEvento/${id}`);
  }

  buscarTodosEventos() {
    return this.http.get<any[]>(`${environment.apiUrl}/evento/listEvento`);
  }

  buscarEventoId(id: any){
    return this.http.get(`${environment.apiUrl}/evento/buscaEvento/${id}`);
  }
}
