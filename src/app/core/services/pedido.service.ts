// src/app/core/services/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pedido, ItemPedido } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) { }

  criarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  getPedidosUsuario(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario`);
  }

  getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  converterCarrinhoParaPedido(itensCarrinho: any[]): Pedido {
    const itensPedido: ItemPedido[] = itensCarrinho.map(item => ({
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario
    }));

    return {
      itens: itensPedido,
      total: itensCarrinho.reduce((total: number, item: any) => total + (item.precoUnitario * item.quantidade), 0),
      status: 'PENDENTE'
    };
  }
}
