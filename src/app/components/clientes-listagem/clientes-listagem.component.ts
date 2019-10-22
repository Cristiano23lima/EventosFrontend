import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ClienteServiceService } from '../../services/cliente-service.service';

@Component({
  selector: 'app-clientes-listagem',
  templateUrl: './clientes-listagem.component.html',
  styleUrls: ['./clientes-listagem.component.css']
})
export class ClientesListagemComponent implements OnInit {

  clientes: Array<any>;
  cliente: any;

  constructor(private ClienteService: ClienteServiceService) {}

  ngOnInit() {
    this.cliente = {};
    // this.pegarClientes();
  }

  // pegarClientes(){
  //   this.ClienteService.getClientes().subscribe(
  //     result => {
  //       this.clientes = result;//adiciona o resultado retornado no vetor
  //     },
  //     error => {
  //       this.clientes = error;
  //       console.log(this.clientes);
  //     }
  //   );
  // }

  // cadastroCliente(form: FormGroup){
  //   this.ClienteService.addCliente(form).subscribe(
  //     res => {
  //       if(res){
  //         this.clientes.push(res);
  //       }
  //     },
  //     (error) => { console.log('Erro : ' + error); }
  //   );
  // }
}
