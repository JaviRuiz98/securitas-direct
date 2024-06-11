import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { parametrosPedido } from '../interfaces/formulario-pedido';
@Injectable({
  providedIn: 'root'
})
export class FormularioNuevoPedidoService {

  private url = "http://localhost:7250/api/";

  constructor(private http: HttpClient) {}

  newPedido(parametros_pedido: parametrosPedido): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'new-pedido', parametros_pedido);
  }
}
