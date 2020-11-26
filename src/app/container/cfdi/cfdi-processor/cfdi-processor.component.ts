import {Component, Input, OnInit} from '@angular/core';
import {FileModel} from "../../../shared/model/file.model";

import {GridOptions} from "ag-grid-community";
import {CfdiModel} from "../../../shared/model/cfdi.model";

@Component({
  selector: 'app-cfdi-processor',
  templateUrl: './cfdi-processor.component.html',
  styleUrls: ['./cfdi-processor.component.css']
})
export class CfdiProcessorComponent implements OnInit {
  @Input() files: FileModel[];
  @Input() cfdi: CfdiModel[];
  public gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any[];
  public columnDefs: any[];
  public rowCount: string;
  private gridApi;

  constructor() {
    this.gridOptions = {
      masterDetail: true,
      defaultColDef: {
        sortable: true
      },
      rowSelection: "multiple",
      detailCellRendererParams: {

        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          columnDefs: [

            {field: 'descripcion'},
            {field: 'cantidad'},

            {field: 'valorUnitario'},
            {field: 'importe'},

          ]
        },

        // get the rows for each Detail Grid
        getDetailRowData(params) {
          console.log(params);
          console.log(params.data);
          params.successCallback(params.data.conceptos);
        }
      }
    } as GridOptions;

    this.createColumnDefs();
  }

  ngOnInit() {

  }

  onGridReady(params) {

    this.gridApi = params.api;

  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: 'Archivo',
        field: 'complemento.uuid',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        cellRenderer: 'agGroupCellRenderer',
      },
      {
        headerName: 'Fecha timbrado',
        field: 'complemento.fechaTimbrado'
      },
      {
        headerName: 'Tipo Comprobante',
        field: 'tipoComprobante',
        filter: true,
      },
      {
        headerName: 'RFC Receptor',
        field: 'receptor.rfc',
      },
      {
        headerName: 'Nombre Receptor',
        field: 'receptor.nombre',
      },
      {
        headerName: 'RFC Emisor',
        field: 'emisor.rfc',
      },
      {
        headerName: 'Nombre Emisor',
        field: 'emisor.nombre',
      },
      {
        headerName: 'Moneda',
        field: 'moneda'
      },
      {
        headerName: 'Total',
        field: 'total'
      },
      {
        headerName: 'Subtotal',
        field: 'subtotal',
      }
    ];
  }
}
