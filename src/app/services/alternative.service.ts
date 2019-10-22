import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlternativeService {
  apiCorreio_appKey: String = 'UsgPMINzSYJx8YoxnOyB9U0mNbIutaL2';
  apiCorreio_appSecret: String = 'efchH51i5nZJ1bpVoWQgiq68MEElSM11bbUNG8ddg3ZqxQk6';

  constructor(private http: HttpClient) { }

  buscarCep(cep) {
    sessionStorage.setItem('token_acesso', 'nao');
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
