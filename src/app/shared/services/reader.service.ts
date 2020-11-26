import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FileModel} from '../model/file.model';
import {Observable, of} from 'rxjs';

import {FileSystemService} from './file-system.service';
import {ElectronService} from 'ngx-electron';
import {CfdiModel} from "../model/cfdi.model";


@Injectable()
export class ReaderService {
  files: FileModel[];

  constructor(private http: HttpClient,
              private fileSystem: FileSystemService,
              private electronService: ElectronService) {
  }

  getFilesFromPath(path: string): Observable<FileModel[]> {
    if (this.electronService.isElectronApp) {
      return of<FileModel[]>(this.fileSystem.getFilesFromPath(path));

    } else {
      const httpParams: HttpParams = new HttpParams()
        .set('path', path);

      return this.http.get<FileModel[]>('http://localhost:3001/reader', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: httpParams
      });
    }
  }

  getFilesFromPath2(path: string): Observable<CfdiModel[]> {
    if (this.electronService.isElectronApp) {
      return of<CfdiModel[]>(this.fileSystem.getFilesFromPath2(path));
    }
  }

  getFileDetail(file: string): Observable<CfdiModel> {
    const httpParams: HttpParams = new HttpParams()
      .set('path', file);
    return this.http.get<CfdiModel>('http://localhost:3001/reader/file', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: httpParams
    });


  }
}
