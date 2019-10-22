import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit, faTrash, faMinus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material';

import { AutenticacaoService } from './../../services/autenticacao.service';
import { Router } from '@angular/router';
import { EventoService } from './../../services/evento.service';
import { Eventos } from './../../models/eventos.model';
import { AlternativeService } from '../../services/alternative.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  //formulario
  eventoForm: FormGroup;
  fileData: File = null;
  local: any = {};

  //variaveis do component
  eventos: Array<any> = null;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Id', 'Titulo', 'Descricao', 'Data', 'Ações'];
  messageSuccess = "";
  messageError = false;
  addEvento = false;
  submitted = false;
  loading = false;

  //ICONS
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;//excluir
  faMinus = faMinus;
  faCaretDown = faCaretDown;

  constructor(private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService, private eventoService: EventoService, private router: Router, private alternativeService: AlternativeService) { }

  ngOnInit() {

    if (!this.autenticacaoService.currentUserValue) {
      this.router.navigate(['/login']);
      return ;
    }

    this.submitted = false;
    this.messageSuccess = "";
    this.messageError = false;
    this.loading = false;
    this.local = {};

    this.listarEventos();

    //reseta o formulario
    this.createForm(new Eventos());
  }

  //criando o objeto do formulario
  createForm(evento: Eventos) {
    this.messageError = false;
    this.messageSuccess = "";
    this.eventoForm = this.formBuilder.group({
      titulo: [evento.titulo, Validators.required],
      descricao: [evento.descricao, Validators.required],
      imagem: [evento.endImagem, Validators.required],
      data: [ evento.data, Validators.required ],
      cep: [ evento.cep, [Validators.required, Validators.minLength(8)]]
    });
  }

  //pegar imagens
  getFile(inputFile: any) {
    this.fileData = inputFile.target.files[0];
  }

  get f() { return this.eventoForm.controls; }

  //enviando os dados para api
  onSubmit() {
    this.submitted = true;

    const formData = new FormData();
    formData.append('imagem', this.fileData);
    formData.append('titulo', this.eventoForm.value.titulo);
    formData.append('descricao', this.eventoForm.value.descricao);
    formData.append('data', this.eventoForm.value.data.replace('T', ' '));
    formData.append('cep', this.local.localidade + ',' + this.local.uf);

    if (this.eventoForm.invalid) {
      return ;
    }

    this.loading = true;

    return this.eventoService.cadastroEvento(formData).subscribe(
      data => {
        this.createForm(new Eventos());
        this.messageSuccess = "Evento criado com sucesso!";
        this.loading = false;
        this.submitted = false;
        this.eventos.push(data);
        this.atualizaTabela();
      },
      err => {
        this.loading = false;
        this.submitted = false;
        this.messageError = true;
        this.messageSuccess = "";
      }
    );
  }

  //exclui o evento
  excluirEvento(id) {
    this.eventoService.excluirEvento(id).subscribe(
      data => {
        this.messageSuccess = 'Evento excluido com sucesso!';
        this.listarEventos();
      },
      err => console.log(err)
    );
  }

  //pegando eventos cadastrados pelo usuario
  listarEventos() {
    this.eventoService.buscarEventosCadastrados().subscribe(
      data => {
        this.eventos = data;
        this.atualizaTabela();
      },
      err => console.log('Erro' + err)
    );
  }

  //buscando endereço pelo cep
  buscarEndereco(cep) {
    this.alternativeService.buscarCep(cep.target.value).subscribe(
      (data: any) => {
        this.local = data;
      }
    );
  }

  //atualiza tabela
  atualizaTabela(): void {
    this.dataSource = new MatTableDataSource(this.eventos);
  }
}
