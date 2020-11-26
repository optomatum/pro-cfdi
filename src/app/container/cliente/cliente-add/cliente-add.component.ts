import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {ClienteModel} from '../../../shared/model/cliente.model';


@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styleUrls: ['./cliente-add.component.css']
})
export class ClienteAddComponent implements OnInit {
  rfc: string;
  nombre: string;
  @Output() outAddCliente = new EventEmitter<ClienteModel>();

  constructor() {
  }

  ngOnInit() {
  }

  addCliente() {
    const cliente = new ClienteModel();
    cliente.rfc = this.rfc;
    cliente.nombre = this.nombre;

    this.outAddCliente.emit(cliente);
    this.rfc = '';
    this.nombre = '';


  }
}
