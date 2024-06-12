import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { parametrosPedido } from '../../interfaces/formulario-pedido';

const BACKEND_API = environment.backendServer + "pedido/";


@Injectable({
  providedIn: 'root'
})
export class FormularioNuevoPedidoService {

  constructor(private http: HttpClient) {}

  newPedido(parametros_pedido: parametrosPedido): Observable<boolean> {
    return this.http.post<boolean>(`${BACKEND_API}new-pedido`, parametros_pedido);
  }
}
