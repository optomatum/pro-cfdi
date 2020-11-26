import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

import {Observable, of} from "rxjs";
import {EmisorModel} from "../model/emisor.model";
import {ReceptorModel} from "../model/receptor.model";
import {CfdiModel, Concepto} from "../model/cfdi.model";


@Injectable()
export class DataService {
  constructor(private electronService: ElectronService) {
  }


  cfdiSave(cfdi: CfdiModel[]): void {
    cfdi.forEach(value => {
      this.electronService.ipcRenderer.sendSync('data-cfdi-save', value);
      console.log(value.conceptos);
      this.conceptosSave(value.complemento.uuid, value.conceptos);


      //console.log(this.electronService.ipcRenderer.sendSync('cfdi-get-filtered','','','',''));
    });

  }

  conceptosSave(uuid, conceptos: Concepto[]): void {
    conceptos.forEach(value => {
      this.electronService.ipcRenderer.sendSync('data-conceptos-save', uuid, value);
    });
  }

  getDistinctEmisor(): Observable<EmisorModel[]> {
    return of(this.electronService.ipcRenderer.sendSync('cfdi-get-distinct-emisor'));
  }

  getDistinctReceptor(): Observable<ReceptorModel[]> {
    return of(this.electronService.ipcRenderer.sendSync('cfdi-get-distinct-receptor'));
  }

  getCfdiFiltered(emisor: EmisorModel, receptor: ReceptorModel, inicio: Date, fin: Date): Observable<CfdiModel[]> {
    const cfdiArray: CfdiModel[] =
      this.electronService.ipcRenderer.sendSync('cfdi-get-filtered', emisor, receptor, inicio, fin);
    cfdiArray.forEach(element => {
      element.conceptos = this.electronService.ipcRenderer.sendSync('conceptos-get-by-uuid', element.complemento.uuid);
    });
    return of(cfdiArray);
    //return of(this.electronService.ipcRenderer.sendSync('cfdi-get-filtered',emisor,receptor,inicio,fin));
  }
}
