import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  constructor(private http: HttpClient) { }

  pegarClientes(){
    return this.http.get(`${environment.apiUrl}/cliente`);
  }
}
