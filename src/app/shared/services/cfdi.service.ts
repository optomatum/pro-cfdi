import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CfdiModel} from '../model/cfid-model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CfdiService {

  constructor(private http: HttpClient) {
  }

  createCfdi(cfdi: CfdiModel): Observable<any> {
    const body = {
      uuid: cfdi.complemento.uuid,
      rfcEmisor: cfdi.emisor.rfc,
      rfcReceptor: cfdi.receptor.rfc,
    };

    return this.http.post('http://localhost:3001/cfdi', body);
  }
}
