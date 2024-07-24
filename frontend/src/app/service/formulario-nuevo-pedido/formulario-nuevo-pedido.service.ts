import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { parametrosPedido } from '../../interfaces/formulario-pedido';
import { listaPedidos } from '../../interfaces/formulario-pedido';

const BACKEND_API = environment.backendServer + "pedido/";

@Injectable({
  providedIn: 'root'
})
export class FormularioNuevoPedidoService {

  constructor(private http: HttpClient) {}

  getListaPedidosByDate(dateTime: string): Observable<listaPedidos[]> {
    const url = `${BACKEND_API}lista?dateTime=${encodeURIComponent(dateTime)}`;
    console.log(url);
    return this.http.get<listaPedidos[]>(url);
  }

  newPedido(parametros_pedido: parametrosPedido): Observable<boolean> {
    console.log(parametros_pedido);
    return this.http.post<boolean>(`${BACKEND_API}new-pedido`, parametros_pedido);
  }
  getListaPedidos(){
    return this.http.get<listaPedidos[]>(`${BACKEND_API}lista-completa`);
  }
  almacenarPedidos(pedidos: any): Observable<boolean> {
    return this.http.post<boolean>(`${BACKEND_API}almacenar-pedidos`, pedidos);
  }
}
