import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClienteModel} from '../../shared/model/cliente.model';
import {ClienteService} from '../../shared/services/cliente.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  @Input() clientes: ClienteModel;
  @Output() outAddCliente = new EventEmitter<ClienteModel>();
  clientes$: Observable<ClienteModel[]>;

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.getClientes();
  }

  /*  addCliente(clienteModel: ClienteModel) {
      this.outAddCliente.emit(clienteModel);
    }*/


  addCliente(clienteModel: ClienteModel) {
    this.clienteService.addCliente(clienteModel);
    this.getClientes();
  }

  getClientes() {
    this.clientes$ = this.clienteService.getClientes();
  }
}
