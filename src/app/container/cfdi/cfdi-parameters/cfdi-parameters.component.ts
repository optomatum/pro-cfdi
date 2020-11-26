import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmisorModel} from "../../../shared/model/emisor.model";
import {ReceptorModel} from "../../../shared/model/receptor.model";

@Component({
  selector: 'app-cfdi-parameters',
  templateUrl: './cfdi-parameters.component.html',
  styleUrls: ['./cfdi-parameters.component.scss']
})
export class CfdiParametersComponent implements OnInit {
  @Input() emisores: EmisorModel[];
  @Input() receptores: ReceptorModel[];
  @Output() receptorSelected = new EventEmitter<ReceptorModel>();
  @Output() emisorSelected = new EventEmitter<EmisorModel>();
  @Output() outInicio = new EventEmitter<Date>();
  @Output() outFin = new EventEmitter<Date>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.emisores);
  }

  changeReceptor(receptor: ReceptorModel) {
    this.receptorSelected.emit(receptor);
  }

  changeEmisor(emisor: EmisorModel) {
    this.emisorSelected.emit(emisor);
  }

  inicioChange(event: Date) {
    this.outInicio.emit(event);
  }

  finChange(event: Date) {
    this.outFin.emit(event);
  }
}
