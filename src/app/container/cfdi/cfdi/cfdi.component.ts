import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {EmisorModel} from "../../../shared/model/emisor.model";
import {ClienteService} from "../../../shared/services/cliente.service";
import {DataService} from "../../../shared/services/data.service";
import {ReceptorModel} from "../../../shared/model/receptor.model";
import {CfdiModel} from "../../../shared/model/cfdi.model";


@Component({
  selector: 'app-cfdi',
  templateUrl: './cfdi.component.html',
  styleUrls: ['./cfdi.component.css']
})
export class CfdiComponent implements OnInit {


  emisores$: Observable<EmisorModel[]>;
  receptores$: Observable<ReceptorModel[]>;
  cfdi$: Observable<CfdiModel[]>;


  receptor: ReceptorModel;
  emisor: EmisorModel;
  inicio: Date;
  fin: Date;

  constructor(private clientesService: ClienteService, private dataService: DataService) {
  }

  ngOnInit() {
    this.receptores$ = this.dataService.getDistinctReceptor();
    this.emisores$ = this.dataService.getDistinctEmisor();
  }

  emisorSelected(emisor: EmisorModel) {
    this.emisor = emisor;
  }

  receptorSelected(receptor: ReceptorModel) {
    this.receptor = receptor;

  }

  inicioSelected(inicio: Date) {
    this.inicio = inicio;

  }

  finSelected(fin: Date) {
    this.fin = fin;
  }

  consultar() {
    this.cfdi$ = this.dataService.getCfdiFiltered(this.emisor, this.receptor, this.inicio, this.fin);
  }
}
