// src/app/features/cart/checkout/checkout.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checkout-container">
      <h1>Finalizar Compra</h1>

      <div *ngIf="carrinho.itens.length === 0" class="empty-cart">
        <p>Seu carrinho está vazio</p>
        <a routerLink="/catalog">Continuar comprando</a>
      </div>

      <div *ngIf="carrinho.itens.length > 0" class="checkout-content">
        <!-- Formulário de checkout -->
        <div class="checkout-form">
          <h2>Informações de Pagamento</h2>
          <!-- Seu formulário aqui -->
        </div>

        <div class="order-summary">
          <h2>Resumo do Pedido</h2>
          <div *ngFor="let item of carrinho.itens" class="order-item">
            {{ item.produto?.nome }} - {{ item.quantidade }} x R$ {{ item.precoUnitario }}
          </div>
          <div class="order-total">
            Total: R$ {{ carrinho.total }}
          </div>
          <button (click)="finalizarPedido()" class="btn-finalizar">
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  carrinhoService = inject(CarrinhoService);
  pedidoService = inject(PedidoService);
  authService = inject(AuthService);
  router = inject(Router);

  carrinho = this.carrinhoService.obterResumo();

  finalizarPedido(): void {
    if (!this.authService.estaAutenticado()) {
      this.router.navigate(['/login']);
      return;
    }

    const pedido = this.pedidoService.converterCarrinhoParaPedido(this.carrinho.itens);

    this.pedidoService.criarPedido(pedido).subscribe({
      next: (pedidoCriado) => {
        console.log('Pedido criado:', pedidoCriado);
        this.carrinhoService.limparCarrinho();
        alert('Pedido realizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erro ao criar pedido:', error);
        alert('Erro ao finalizar pedido. Tente novamente.');
      }
    });
  }
}
