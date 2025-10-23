// src/app/core/services/carrinho.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto, ItemCarrinho } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itens: ItemCarrinho[] = [];
  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  public carrinho$: Observable<ItemCarrinho[]> = this.carrinhoSubject.asObservable();

  adicionarAoCarrinho(produto: Produto, quantidade: number = 1): void {
    const itemExistente = this.itens.find(item => item.produtoId === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.push({
        produtoId: produto.id!,
        quantidade: quantidade,
        precoUnitario: produto.preco,
        produto: produto
      });
    }

    this.notificarMudancas();
  }

  removerItem(produtoId: number): void {
    this.itens = this.itens.filter(item => item.produtoId !== produtoId);
    this.notificarMudancas();
  }

  atualizarQuantidade(produtoId: number, quantidade: number): void {
    const item = this.itens.find(item => item.produtoId === produtoId);
    if (item) {
      if (quantidade <= 0) {
        this.removerItem(produtoId);
      } else {
        item.quantidade = quantidade;
        this.notificarMudancas();
      }
    }
  }

  limparCarrinho(): void {
    this.itens = [];
    this.notificarMudancas();
  }

  obterItens(): ItemCarrinho[] {
    return [...this.itens];
  }

  obterQuantidadeTotal(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  obterTotal(): number {
    return this.itens.reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0);
  }

  obterResumo() {
    return {
      itens: this.obterItens(),
      quantidadeTotal: this.obterQuantidadeTotal(),
      total: this.obterTotal()
    };
  }

  private notificarMudancas(): void {
    this.carrinhoSubject.next([...this.itens]);
  }
}
