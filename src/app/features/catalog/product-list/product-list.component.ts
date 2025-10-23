// src/app/features/catalog/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { Produto, ItemCarrinho } from '../../../core/models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="catalog-page">
      <!-- Header da Página -->
      <header class="page-header">
        <div class="header-content">
          <h1>Nossos Produtos</h1>
          <p class="subtitle">Encontre os melhores produtos com os melhores preços</p>

          <!-- Indicador do Carrinho no Header -->
          <div class="cart-indicator" *ngIf="quantidadeTotal > 0">
            <a routerLink="/carrinho" class="cart-link">
              🛒 {{ quantidadeTotal }} item(s) - R$ {{ total | number:'1.2-2' }}
            </a>
          </div>
        </div>
      </header>

      <!-- Grid de Produtos -->
      <section class="products-section">
        <div class="products-grid">
          <div *ngFor="let produto of produtos" class="product-card">
            <div class="card-image">
              <img [src]="produto.imagemUrl || 'https://via.placeholder.com/300'"
                   [alt]="produto.nome"
                   class="product-image">
              <div *ngIf="produto.estoque < 5 && produto.estoque > 0" class="stock-badge low-stock">
                Últimas {{ produto.estoque }} unidades!
              </div>
              <div *ngIf="produto.estoque === 0" class="stock-badge out-of-stock">
                Esgotado
              </div>
            </div>

            <div class="card-body">
              <h3 class="product-title">{{ produto.nome }}</h3>
              <p class="product-description">{{ produto.descricao }}</p>

              <div class="product-meta">
                <div class="product-price">R$ {{ produto.preco | number:'1.2-2' }}</div>
                <div class="product-stock" [class.low-stock]="produto.estoque < 10">
                  {{ produto.estoque }} em estoque
                </div>
              </div>
            </div>

            <div class="card-actions">
              <button
                (click)="adicionarAoCarrinho(produto)"
                [disabled]="produto.estoque === 0 || !produto.ativo"
                class="add-to-cart-btn"
                [class.disabled]="produto.estoque === 0 || !produto.ativo"
              >
                <span *ngIf="!produto.ativo; else stockCheck">
                  🔴 Inativo
                </span>
                <ng-template #stockCheck>
                  <span *ngIf="produto.estoque === 0; else addText">
                    🔴 Sem Estoque
                  </span>
                  <ng-template #addText>
                    🛒 Adicionar ao Carrinho
                  </ng-template>
                </ng-template>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .catalog-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem 0;
      border-bottom: 2px solid #f0f0f0;
    }

    .header-content {
      position: relative;
    }

    .header-content h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin: 0 0 1rem 0;
    }

    .cart-indicator {
      position: absolute;
      top: 0;
      right: 0;
    }

    .cart-link {
      display: inline-block;
      background: #3483fa;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(52, 131, 250, 0.3);
      transition: all 0.3s ease;
    }

    .cart-link:hover {
      background: #2968c8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(52, 131, 250, 0.4);
    }

    .products-section {
      margin-top: 2rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid #e1e5e9;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image {
      transform: scale(1.05);
    }

    .stock-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .low-stock {
      background: #e67e22;
    }

    .out-of-stock {
      background: #e74c3c;
    }

    .card-body {
      padding: 1.5rem;
    }

    .product-title {
      font-size: 1.25rem;
      color: #2c3e50;
      margin: 0 0 0.75rem 0;
      font-weight: 600;
      line-height: 1.3;
    }

    .product-description {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0 0 1rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2ecc71;
    }

    .product-stock {
      font-size: 0.85rem;
      color: #7f8c8d;
    }

    .product-stock.low-stock {
      color: #e67e22;
      font-weight: 600;
    }

    .card-actions {
      padding: 0 1.5rem 1.5rem;
    }

    .add-to-cart-btn {
      width: 100%;
      background: #3498db;
      color: white;
      border: none;
      padding: 0.875rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .add-to-cart-btn:hover:not(.disabled) {
      background: #2980b9;
      transform: translateY(-1px);
    }

    .add-to-cart-btn.disabled {
      background: #bdc3c7;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 768px) {
      .catalog-page {
        padding: 1rem 0.5rem;
      }

      .page-header {
        margin-bottom: 2rem;
        padding: 1rem 0;
      }

      .header-content h1 {
        font-size: 2rem;
      }

      .cart-indicator {
        position: static;
        margin-top: 1rem;
      }

      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {

  produtos: Produto[] = [];
  quantidadeTotal: number = 0;
  total: number = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
    this.atualizarResumo();

    // Escuta mudanças no carrinho
    this.carrinhoService.carrinho$.subscribe(() => {
      this.atualizarResumo();
    });
  }

  carregarProdutos(): void {
    // Produtos mock
    this.produtos = [
      {
        id: 1,
        nome: 'Smartphone Android Premium',
        preco: 1299.99,
        descricao: 'Smartphone com 128GB, 6GB RAM, câmera tripla de 48MP',
        imagemUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        categoria: 'Eletrônicos',
        estoque: 15,
        ativo: true
      },
      {
        id: 2,
        nome: 'Notebook Gamer Pro',
        preco: 4599.99,
        descricao: 'Notebook com RTX 3050, 16GB RAM, SSD 512GB',
        imagemUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
        categoria: 'Eletrônicos',
        estoque: 8,
        ativo: true
      },
      {
        id: 3,
        nome: 'Fone Bluetooth Profissional',
        preco: 299.99,
        descricao: 'Fone sem fio com cancelamento de ruído ativo',
        imagemUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        categoria: 'Áudio',
        estoque: 25,
        ativo: true
      }
    ];
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoService.adicionarAoCarrinho(produto);
  }

  private atualizarResumo(): void {
    const resumo = this.carrinhoService.obterResumo();
    this.quantidadeTotal = resumo.quantidadeTotal;
    this.total = resumo.total;
  }
}
