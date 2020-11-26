import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ReaderService} from '../../../shared/services/reader.service';
import {Observable} from 'rxjs';
import {FileElement} from '../../../shared/model/file-element';
import {FileService} from '../../../shared/services/file.service';
import {FileSystemService} from '../../../shared/services/file-system.service';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-path-selector',
  templateUrl: './path-selector.component.html',
  styleUrls: ['./path-selector.component.css']
})
export class PathSelectorComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() outSubmitEvent = new EventEmitter<string>();


  fileElements: Observable<FileElement[]>;
  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;

  constructor(private readerService: ReaderService,
              private fileService: FileService,
              private fileSystem: FileSystemService,
              private electronService: ElectronService) {
  }

  ngOnInit() {
    const files$ = this.readerService.getFilesFromPath('');
    const folderA = this.fileService.add({name: 'Folder A', isFolder: true, parent: 'root'});
    this.fileService.add({name: 'Folder B', isFolder: true, parent: 'root'});
    this.fileService.add({name: 'Folder C', isFolder: true, parent: folderA.id});
    this.fileService.add({name: 'File A', isFolder: false, parent: 'root'});
    this.fileService.add({name: 'File B', isFolder: false, parent: 'root'});

    this.updateFileElementQuery();
  }

  onSubmit() {
    if (this.electronService.isElectronApp) {
      const path = this.fileSystem.openFileDialog();
      this.outSubmitEvent.emit(path[0]);
    } else {
      const path = this.fileInput.nativeElement.value;
      this.outSubmitEvent.emit(path);
    }
  }


  addFolder(folder: { name: string }) {
    this.fileService.add({isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root'});
    this.updateFileElementQuery();
  }

  removeElement(element: FileElement) {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id, {parent: event.moveTo.id});
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement) {
    this.fileService.update(element.id, {name: element.name});
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    const split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }
}
