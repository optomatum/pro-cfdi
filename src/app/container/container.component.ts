import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FileModel} from '../shared/model/file.model';
import {ReaderService} from '../shared/services/reader.service';

import {ClienteService} from '../shared/services/cliente.service';
import {CfdiModel} from "../shared/model/cfdi.model";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  files$: Observable<FileModel[]>;
  cfdi$: Observable<CfdiModel>;

  private loadedFeature = '';

  constructor(
    private readerService: ReaderService,
    private clienteService: ClienteService
  ) {
  }

  ngOnInit() {

  }

  onSubmitEvent(path: string) {
    this.files$ = this.readerService.getFilesFromPath(path);
  }

  onFileDetail(file: FileModel) {
    this.cfdi$ = this.readerService.getFileDetail(file.path);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
