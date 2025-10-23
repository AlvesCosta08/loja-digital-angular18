// src/app/features/cart/cart-page/cart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { ItemCarrinho } from '../../../core/models';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-page">
      <div class="container">
        <header class="page-header">
          <h1>Meu Carrinho</h1>
          <a routerLink="/catalog" class="back-link">← Continuar comprando</a>
        </header>

        <div class="cart-layout">
          <!-- Lista de Itens -->
          <div class="cart-items-section">
            <div class="section-header">
              <h2>Produtos no carrinho</h2>
              <button
                *ngIf="itens.length > 0"
                (click)="limparCarrinho()"
                class="btn-limpar"
              >
                🗑️ Limpar carrinho
              </button>
            </div>

            <div *ngIf="itens.length === 0" class="empty-cart">
              <div class="empty-icon">🛒</div>
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione produtos incríveis ao seu carrinho!</p>
              <a routerLink="/catalog" class="btn-continuar">Continuar comprando</a>
            </div>

            <div *ngIf="itens.length > 0" class="cart-items">
              <div *ngFor="let item of itens" class="cart-item">
                <div class="item-image">
                  <img [src]="item.produto?.imagemUrl || 'https://via.placeholder.com/100'"
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

          <!-- Resumo do Pedido -->
          <div class="cart-summary" *ngIf="itens.length > 0">
            <div class="summary-card">
              <h3>Resumo do pedido</h3>

              <div class="summary-row">
                <span>Produtos ({{ quantidadeTotal }})</span>
                <span>R$ {{ total | number:'1.2-2' }}</span>
              </div>

              <div class="summary-row">
                <span>Frete</span>
                <span class="free-shipping">Grátis</span>
              </div>

              <div class="divider"></div>

              <div class="summary-total">
                <strong>Total</strong>
                <strong>R$ {{ total | number:'1.2-2' }}</strong>
              </div>

              <button class="btn-buy" (click)="finalizarCompra()">
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 2rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      margin: 0;
      color: #333;
      font-size: 2rem;
    }

    .back-link {
      color: #3483fa;
      text-decoration: none;
      font-weight: 600;
    }

    .back-link:hover {
      text-decoration: underline;
    }

    .cart-layout {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 2rem;
    }

    .cart-items-section {
      background: white;
      border-radius: 8px;
      padding: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .section-header h2 {
      margin: 0;
      color: #333;
    }

    .btn-limpar {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-limpar:hover {
      background: #c0392b;
    }

    .empty-cart {
      text-align: center;
      padding: 4rem 2rem;
      color: #666;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.3;
    }

    .empty-cart h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .empty-cart p {
      margin: 0 0 2rem 0;
    }

    .btn-continuar {
      display: inline-block;
      background: #3483fa;
      color: white;
      padding: 1rem 2rem;
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
      gap: 1.5rem;
    }

    .cart-item {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .item-image {
      flex-shrink: 0;
      width: 100px;
      height: 100px;
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
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .product-description {
      margin: 0 0 1rem 0;
      color: #666;
      font-size: 0.9rem;
    }

    .price {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .btn-quantity {
      width: 35px;
      height: 35px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
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
      gap: 1rem;
    }

    .item-total {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
    }

    .btn-remove {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-remove:hover {
      background: #c0392b;
    }

    .cart-summary {
      position: sticky;
      top: 2rem;
      height: fit-content;
    }

    .summary-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .summary-card h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: #666;
    }

    .free-shipping {
      color: #00a650;
      font-weight: 600;
    }

    .divider {
      height: 1px;
      background: #eee;
      margin: 1.5rem 0;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: #333;
    }

    .btn-buy {
      width: 100%;
      background: #00a650;
      color: white;
      border: none;
      padding: 1.25rem;
      border-radius: 6px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-buy:hover {
      background: #008c45;
    }

    @media (max-width: 768px) {
      .cart-layout {
        grid-template-columns: 1fr;
      }

      .cart-items-section {
        padding: 1rem;
      }

      .cart-item {
        flex-direction: column;
        gap: 1rem;
      }

      .item-actions {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }
    }
  `]
})
export class CartPageComponent implements OnInit {
  itens: ItemCarrinho[] = [];
  quantidadeTotal: number = 0;
  total: number = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carregarCarrinho();

    this.carrinhoService.carrinho$.subscribe(() => {
      this.carregarCarrinho();
    });
  }

  carregarCarrinho(): void {
    const resumo = this.carrinhoService.obterResumo();
    this.itens = resumo.itens;
    this.quantidadeTotal = resumo.quantidadeTotal;
    this.total = resumo.total;
  }

  aumentarQuantidade(produtoId: number): void {
    const item = this.itens.find(i => i.produtoId === produtoId);
    if (item) {
      this.carrinhoService.atualizarQuantidade(produtoId, item.quantidade + 1);
    }
  }

  diminuirQuantidade(produtoId: number): void {
    const item = this.itens.find(i => i.produtoId === produtoId);
    if (item && item.quantidade > 1) {
      this.carrinhoService.atualizarQuantidade(produtoId, item.quantidade - 1);
    }
  }

  removerItem(produtoId: number): void {
    this.carrinhoService.removerItem(produtoId);
  }

  limparCarrinho(): void {
    if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      this.carrinhoService.limparCarrinho();
    }
  }

  finalizarCompra(): void {
    alert('Redirecionando para finalização da compra...');
  }
}
