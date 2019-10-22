import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  eventos: Array<any>;
  exp: any;

  constructor(private router: Router, private eventoService: EventoService) { }

  ngOnInit() {
    this.exp = /\s/g;
    if (!sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/login']);
      return ;
    }

    this.loading = true;

    this.listaEventos();//lista todos os eventos cadastrados
  }

  listaEventos() {
    this.eventoService.buscarTodosEventos().subscribe(
      data => this.eventos = data,
      err => console.log(err)
    )
  }

}
