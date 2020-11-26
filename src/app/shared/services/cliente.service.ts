import {Injectable} from '@angular/core';
import {ClienteModel} from '../model/cliente.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes = new BehaviorSubject<ClienteModel[]>([]);

  constructor(private http: HttpClient) {
    this.loadClientes();
  }

  addCliente(clienteModel: ClienteModel) {
    const body = {
      rfc: clienteModel.rfc,
      nombre: clienteModel.nombre,
    };

    this.http.post('http://localhost:3001/clientes', body)
      .subscribe(() => this.loadClientes());

  }

  getClientes() {
    return this.clientes.asObservable();
  }

  private loadClientes() {
    this.http.get<ClienteModel[]>('http://localhost:3001/clientes')
      .subscribe((clientes) => this.clientes.next(clientes));
  }
}
