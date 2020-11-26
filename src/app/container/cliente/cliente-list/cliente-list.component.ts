import {Component, Input, OnInit} from '@angular/core';
import {ClienteModel} from '../../../shared/model/cliente.model';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  @Input() clientes: ClienteModel[] = [];
  columnsToDisplay = ['rfc', 'nombre'];

  constructor() {
  }

  ngOnInit() {
  }

}
