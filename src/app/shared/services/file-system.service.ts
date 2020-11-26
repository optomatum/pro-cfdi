import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {FileModel} from '../model/file.model';
import {CfdiModel} from "../model/cfdi.model";


/*@Injectable({
  providedIn: 'root'
})*/
@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private electronService: ElectronService) {
  }

  openFileDialog(): string {
    //console.log(selectedDirectory);
    //console.log(this.getFiles(selectedDirectory[0]));
    return this.electronService.ipcRenderer.sendSync('open-file-dialog');

  }

  getFilesFromPath(path: string): FileModel[] {


    return this.electronService.ipcRenderer.sendSync('get-files-from-path', path);

  }

  getFileContent(filename: string): CfdiModel {
    console.log(filename);
    return this.electronService.ipcRenderer.sendSync('get-file-content', filename);
  }

  getFiles(path: string): CfdiModel[] {
    const cfdiModel: CfdiModel[] = [];
    const fileModel: FileModel[] = this.getFilesFromPath(path);
    for (const file of fileModel) {
      cfdiModel.push(this.getFileContent(file.path));
    }

    return cfdiModel;
  }

  getFilesFromPath2(path: string): CfdiModel[] {
    return this.getFiles(path);
  }
}
