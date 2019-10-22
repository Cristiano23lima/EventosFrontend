import { EventoService } from 'src/app/services/evento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-eventos',
  templateUrl: './view-eventos.component.html',
  styleUrls: ['./view-eventos.component.css']
})
export class ViewEventosComponent implements OnInit {
  idEvento: any;
  eventoDetalhe: any;

  constructor(private route: ActivatedRoute, private eventoService: EventoService) { }

  ngOnInit() {

    this.route.params.subscribe( (data: any) => this.idEvento = data.slug.split('-'));
    this.eventoService.buscarEventoId(this.idEvento[0]).subscribe(
      data => this.eventoDetalhe = data
    );
  }

}
