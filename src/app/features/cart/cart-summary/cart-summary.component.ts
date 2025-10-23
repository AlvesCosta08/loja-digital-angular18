// src/app/features/cart/cart-summary/cart-summary.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-summary">
      <div class="summary-card">
        <h3>Resumo do pedido</h3>

        <div class="summary-row">
          <span>Produtos ({{ resumo.quantidadeTotal }})</span>
          <span>R$ {{ resumo.total | number:'1.2-2' }}</span>
        </div>

        <div class="summary-row">
          <span>Frete</span>
          <span class="free-shipping">Grátis</span>
        </div>

        <div class="divider"></div>

        <div class="summary-total">
          <strong>Total</strong>
          <strong>R$ {{ resumo.total | number:'1.2-2' }}</strong>
        </div>

        <button
          *ngIf="resumo.quantidadeTotal > 0"
          class="btn-buy"
          (click)="finalizarCompra()"
        >
          Finalizar compra
        </button>

        <a
          *ngIf="resumo.quantidadeTotal === 0"
          routerLink="/catalog"
          class="btn-continue"
        >
          Continuar comprando
        </a>
      </div>
    </div>
  `,
  styles: [`
    .cart-summary {
      max-width: 300px;
    }

    .summary-card {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 20px;
    }

    .summary-card h3 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: #666;
    }

    .free-shipping {
      color: #00a650;
      font-weight: 600;
    }

    .divider {
      height: 1px;
      background: #eee;
      margin: 15px 0;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #333;
    }

    .btn-buy {
      width: 100%;
      background: #3483fa;
      color: white;
      border: none;
      padding: 15px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-buy:hover {
      background: #2968c8;
    }

    .btn-continue {
      display: block;
      width: 100%;
      background: #3483fa;
      color: white;
      text-align: center;
      padding: 15px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
    }

    .btn-continue:hover {
      background: #2968c8;
    }

    @media (max-width: 768px) {
      .cart-summary {
        max-width: 100%;
      }
    }
  `]
})
export class CartSummaryComponent {
  resumo: any = { quantidadeTotal: 0, total: 0 };

  constructor(private carrinhoService: CarrinhoService) {
    this.atualizarResumo();
  }

  finalizarCompra(): void {
    alert('Redirecionando para finalização da compra...');
    // this.router.navigate(['/checkout']);
  }

  private atualizarResumo(): void {
    this.resumo = this.carrinhoService.obterResumo();
  }
}
