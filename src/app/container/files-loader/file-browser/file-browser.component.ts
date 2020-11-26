import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReaderService} from '../../../shared/services/reader.service';
import {FileModel} from '../../../shared/model/file.model';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.css']
})
export class FileBrowserComponent implements OnInit {
  @Input() files: FileModel[];

  @Output() outFileDetail = new EventEmitter<FileModel>();
  @Output() outFileSave = new EventEmitter<FileModel>();

  columnsToDisplay = ['name', 'path', 'action'];

  constructor(private readerService: ReaderService) {
  }

  ngOnInit() {
  }


  onFileDetail(fileSelected: FileModel) {

    const file = this.files.find((file: FileModel) => {
      return file.name === fileSelected.name;
    });


    this.outFileDetail.emit(file);
  }

  onFileSave(fileSelected: FileModel) {
    console.log('file save');
    console.log(fileSelected);
    this.outFileSave.emit(fileSelected);
  }
}
