import {Component, Input, OnInit} from '@angular/core';
import {ClienteModel} from '../../../../shared/model/cliente.model';

@Component({
  selector: 'app-cliente-item',
  templateUrl: './cliente-item.component.html',
  styleUrls: ['./cliente-item.component.css']
})
export class ClienteItemComponent implements OnInit {
  @Input() cliente: ClienteModel;

  constructor() {
  }

  ngOnInit() {
  }

}
