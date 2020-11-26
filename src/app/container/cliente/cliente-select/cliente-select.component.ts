import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClienteModel} from '../../../shared/model/cliente.model';

@Component({
  selector: 'app-cliente-select',
  templateUrl: './cliente-select.component.html',
  styleUrls: ['./cliente-select.component.css']
})
export class ClienteSelectComponent implements OnInit {
  @Input() clientes: ClienteModel[];
  @Output() outClienteSelected = new EventEmitter<ClienteModel>();
  selected: any;

  constructor() {
  }

  ngOnInit() {
  }


}
