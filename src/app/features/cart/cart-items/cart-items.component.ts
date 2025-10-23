// src/app/features/cart/cart-items/cart-items.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { ItemCarrinho } from '../../../core/models';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container">
      <!-- Header do Carrinho -->
      <div class="cart-header">
        <h2>Meu Carrinho</h2>
        <div class="cart-info">
          <span class="items-count">{{ resumo.quantidadeTotal }} itens</span>
          <button
            *ngIf="resumo.itens.length > 0"
            (click)="limparCarrinho()"
            class="btn-limpar"
          >
            Limpar carrinho
          </button>
        </div>
      </div>

      <!-- Carrinho Vazio -->
      <div *ngIf="resumo.itens.length === 0" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>Seu carrinho está vazio</h3>
        <p>Adicione produtos incríveis!</p>
        <a routerLink="/catalog" class="btn-continuar">Continuar comprando</a>
      </div>

      <!-- Lista de Itens -->
      <div *ngIf="resumo.itens.length > 0" class="cart-items">
        <div *ngFor="let item of resumo.itens" class="cart-item">
          <div class="item-image">
            <img [src]="item.produto?.imagemUrl || 'https://via.placeholder.com/80'"
                 [alt]="item.produto?.nome">
          </div>

          <div class="item-details">
            <h3 class="product-name">{{ item.produto?.nome }}</h3>
            <p class="product-description">{{ item.produto?.descricao }}</p>
            <div class="price">R$ {{ item.precoUnitario | number:'1.2-2' }}</div>

            <div class="quantity-controls">
              <button
                (click)="diminuirQuantidade(item.produtoId)"
                class="btn-quantity"
                [class.disabled]="item.quantidade <= 1"
              >
                -
              </button>
              <span class="quantity">{{ item.quantidade }}</span>
              <button
                (click)="aumentarQuantidade(item.produtoId)"
                class="btn-quantity"
              >
                +
              </button>
            </div>
          </div>

          <div class="item-actions">
            <div class="item-total">
              R$ {{ (item.precoUnitario * item.quantidade) | number:'1.2-2' }}
            </div>
            <button
              (click)="removerItem(item.produtoId)"
              class="btn-remove"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #eee;
    }

    .cart-header h2 {
      margin: 0;
      color: #333;
      font-size: 24px;
    }

    .cart-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .items-count {
      color: #666;
      font-size: 14px;
    }

    .btn-limpar {
      background: none;
      border: 1px solid #ddd;
      color: #666;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .btn-limpar:hover {
      background: #f5f5f5;
    }

    .empty-cart {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 20px;
      opacity: 0.3;
    }

    .empty-cart h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .empty-cart p {
      margin: 0 0 20px 0;
    }

    .btn-continuar {
      display: inline-block;
      background: #3483fa;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
    }

    .btn-continuar:hover {
      background: #2968c8;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .cart-item {
      display: flex;
      gap: 15px;
      padding: 20px;
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
    }

    .item-image {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details {
      flex: 1;
    }

    .product-name {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }

    .product-description {
      margin: 0 0 12px 0;
      color: #666;
      font-size: 14px;
      line-height: 1.4;
    }

    .price {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-quantity {
      width: 32px;
      height: 32px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .btn-quantity:hover:not(.disabled) {
      background: #f5f5f5;
    }

    .btn-quantity.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quantity {
      min-width: 40px;
      text-align: center;
      font-weight: 600;
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
    }

    .item-total {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .btn-remove {
      background: none;
      border: 1px solid #ff4444;
      color: #ff4444;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .btn-remove:hover {
      background: #ff4444;
      color: white;
    }

    @media (max-width: 768px) {
      .cart-container {
        padding: 10px;
      }

      .cart-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }

      .cart-item {
        flex-direction: column;
        gap: 15px;
      }

      .item-actions {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  `]
})
export class CartItemsComponent {
  resumo: any = { itens: [], quantidadeTotal: 0, total: 0 };

  constructor(private carrinhoService: CarrinhoService) {
    this.atualizarResumo();
  }

  aumentarQuantidade(produtoId: number): void {
    const item = this.resumo.itens.find((i: ItemCarrinho) => i.produtoId === produtoId);
    if (item) {
      this.carrinhoService.atualizarQuantidade(produtoId, item.quantidade + 1);
      this.atualizarResumo();
    }
  }

  diminuirQuantidade(produtoId: number): void {
    const item = this.resumo.itens.find((i: ItemCarrinho) => i.produtoId === produtoId);
    if (item && item.quantidade > 1) {
      this.carrinhoService.atualizarQuantidade(produtoId, item.quantidade - 1);
      this.atualizarResumo();
    }
  }

  removerItem(produtoId: number): void {
    this.carrinhoService.removerItem(produtoId);
    this.atualizarResumo();
  }

  limparCarrinho(): void {
    if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      this.carrinhoService.limparCarrinho();
      this.atualizarResumo();
    }
  }

  private atualizarResumo(): void {
    this.resumo = this.carrinhoService.obterResumo();
  }
}
