// src/app/core/services/pedido.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemPedido, Pedido } from '../models'; // ✅ Importa do models.ts

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private pedidos: Pedido[] = [];

  criar(itens: ItemPedido[]): Observable<Pedido> {
    const novoPedido: Pedido = {
      id: Date.now(),
      data: new Date().toISOString().split('T')[0],
      status: 'PENDENTE',
      itens
    };
    this.pedidos.push(novoPedido);
    return of(novoPedido);
  }

  listar(): Observable<Pedido[]> {
    return of(this.pedidos);
  }
}
