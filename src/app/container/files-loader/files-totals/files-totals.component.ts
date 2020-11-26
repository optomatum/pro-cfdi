import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-files-totals',
  templateUrl: './files-totals.component.html',
  styleUrls: ['./files-totals.component.scss']
})
export class FilesTotalsComponent implements OnInit {
  @Input() totalIngresos: number;
  @Input() totalEgresos: number;
  @Input() totalIngresosImpuestosTrasladados: number;
  @Input() totalIngresosImpuestosRetenidos: number;
  @Input() totalEgresosImpuestosTrasladados: number;
  @Input() totalEgresosImpuestosRetenidos: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
