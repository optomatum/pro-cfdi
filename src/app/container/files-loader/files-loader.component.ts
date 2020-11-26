import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileModel} from '../../shared/model/file.model';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';

import {ReaderService} from '../../shared/services/reader.service';
import {CfdiService} from '../../shared/services/cfdi.service';
import {map, reduce, switchMap} from "rxjs/operators";
import {CfdiModel} from "../../shared/model/cfdi.model";


@Component({
  selector: 'app-files-loader',
  templateUrl: './files-loader.component.html',
  styleUrls: ['./files-loader.component.css']
})
export class FilesLoaderComponent implements OnInit {
  @Output() outSubmitEvent = new EventEmitter<string>();
  @Output() outFileDetail = new EventEmitter<FileModel>();
  // @Input() files: FileModel[];

  public totalIngresos$: Observable<number>;
  public totalEgresos$: Observable<number>;
  public totalIngresosImpuestosTrasladados$: Observable<number>;
  public totalIngresosImpuestosRetenidos$: Observable<number>;
  public totalEgresosImpuestosTrasladados$: Observable<number>;
  public totalEgresosImpuestosRetenidos$: Observable<number>;


  public files$: Observable<FileModel[]>;
  //cfdi$: BehaviorSubject<CfdiModel[]> = new BehaviorSubject<CfdiModel[]>([]);


  //cfdi$: Observable<CfdiModel[]>;
  public cfdi$: Observable<CfdiModel[]>;
  private selected$: BehaviorSubject<CfdiModel[]> = new BehaviorSubject<CfdiModel[]>([]);

  private filteredCfdi$: Observable<CfdiModel[]>;


  constructor(private readerService: ReaderService, private cfdiService: CfdiService) {

  }

  ngOnInit() {

    this.filteredCfdi$ = combineLatest([this.cfdi$, this.selected$]).pipe(
      map(([cfdi, selected]) => {
        if (selected.length === 0) {
          return cfdi;
        } else {
          return selected;
        }
      }),
    );
    this.getTotals();

  }


  onSubmitEvent(path: string) {

    this.cfdi$ = this.readerService.getFilesFromPath2(path);


  }

  onFileDetail(file: FileModel) {

  }

  onFileSave(file: FileModel) {
    console.log('on file save' + file);
    this.readerService.getFileDetail(file.path)
      .subscribe(
        (cfdi) =>
          this.cfdiService.createCfdi(cfdi).subscribe()
      );
  }

  cfdiChanged(data: CfdiModel[]) {

    this.selected$.next(data);


  }

  private getTotals(): void {

    this.totalEgresos$ = this.filteredCfdi$.pipe(
      map(x => x.filter(x => x.tipoComprobante === 'E')),

      switchMap(a => a),

      reduce((x, y) => {

        return x + parseFloat(y.total);
      }, 0),
    );
    this.totalIngresos$ = this.filteredCfdi$.pipe(
      map(x => x.filter(x => x.tipoComprobante === 'I')),

      switchMap(a => a),

      reduce((x, y) => {

          return x + parseFloat(y.total);
        }
        , 0),
    );
    this.totalEgresosImpuestosTrasladados$ = this.filteredCfdi$.pipe(
      map(x => x.filter(x => x.tipoComprobante === 'E')),

      switchMap(a => a),

      reduce((x, y) => {
          return ('impuesto' in y && 'totalImpuestosTrasladados' in y.impuesto) ? x + parseFloat(y.impuesto.totalImpuestosTrasladados) : x;
        }
        , 0),
    );
    this.totalIngresosImpuestosTrasladados$ = this.filteredCfdi$.pipe(
      map(x => x.filter(x => x.tipoComprobante === 'I')),

      switchMap(a => a),

      reduce((x, y) => {
          return ('impuesto' in y && 'totalImpuestosTrasladados' in y.impuesto) ? x + parseFloat(y.impuesto.totalImpuestosTrasladados) : x;

        }
        , 0),
    );
    this.totalEgresosImpuestosRetenidos$ = this.filteredCfdi$.pipe(
      map(x => x.filter(x => x.tipoComprobante === 'E')),

      switchMap(a => a),

      reduce((x, y) => {
          return ('impuesto' in y && 'totalImpuestosRetenidos' in y.impuesto) ? x + parseFloat(y.impuesto.totalImpuestosRetenidos) : x;
        }
        , 0),
    );

    this.totalIngresosImpuestosRetenidos$ = this.filteredCfdi$.pipe(
      map(x => x.filter(x => x.tipoComprobante === 'I')),

      switchMap(a => a),

      reduce((x, y) => {
          return ('impuesto' in y && 'totalImpuestosRetenidos' in y.impuesto) ? x + parseFloat(y.impuesto.totalImpuestosRetenidos) : x;
        }
        , 0),
    );

  }
}
