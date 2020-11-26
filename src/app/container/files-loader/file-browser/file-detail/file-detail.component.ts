import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileModel} from '../../../../shared/model/file.model';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
  @Input() file: FileModel;
  @Output() outFileDetail = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {

  }

  onFileDetail() {
    this.outFileDetail.emit();
  }
}
