import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../core/services/produto.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Nossos Produtos</h1>
      <div class="product-grid">
        <div *ngFor="let p of produtos$ | async" class="product-card">
          <h3>{{ p.nome }}</h3>
          <p>{{ p.descricao }}</p>
          <strong>R$ {{ p.preco | number:'1.2-2' }}</strong>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .product-card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      background: white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .product-card h3 {
      margin: 0 0 0.75rem;
      color: #1976d2;
    }
    .product-card p {
      color: #555;
      margin-bottom: 1rem;
    }
    strong {
      font-size: 1.25rem;
      color: #2e7d32;
    }
  `]
})
export class ProductListComponent {
  private produtoService = inject(ProdutoService);
  produtos$ = this.produtoService.listar();
}
