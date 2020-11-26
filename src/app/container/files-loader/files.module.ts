import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import {FilesGridComponent} from './files-grid/files-grid.component';
import {FileSystemService} from '../../shared/services/file-system.service';
import {ReaderService} from '../../shared/services/reader.service';
import {DataService} from '../../shared/services/data.service';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FilesTotalsComponent} from './files-totals/files-totals.component';

@NgModule({
  declarations: [FilesGridComponent, FilesTotalsComponent],
  exports: [
    FilesGridComponent,
    FilesTotalsComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MatCardModule,

    MatButtonModule,

  ],
  providers: [FileSystemService, ReaderService, DataService]
})
export class FilesModule {
}
