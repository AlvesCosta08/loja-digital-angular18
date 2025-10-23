// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CarrinhoService } from './core/services/carrinho.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <a routerLink="/home" class="logo">🛍️ Loja Digital</a>

          <nav class="nav">
            <a routerLink="/catalog" class="nav-link">Produtos</a>

            <!-- Indicador do Carrinho -->
            <a routerLink="/cart" class="cart-indicator" *ngIf="quantidadeItens > 0">
              🛒 {{ quantidadeItens }}
            </a>

            <!-- Usuário logado -->
            <div *ngIf="authService.estaAutenticado()" class="user-menu">
              <span class="user-greeting">Olá, {{ authService.getUsuarioAtual()?.nome }}</span>
              <button (click)="logout()" class="btn-logout">Sair</button>
            </div>

            <!-- Usuário não logado -->
            <div *ngIf="!authService.estaAutenticado()" class="auth-links">
              <a routerLink="/login" class="nav-link">Login</a>
              <a routerLink="/register" class="nav-link">Registrar</a>
            </div>
          </nav>
        </div>
      </header>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <footer class="app-footer">
        <p>&copy; 2024 Loja Digital. Todos os direitos reservados.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
      text-decoration: none;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-link:hover {
      color: #667eea;
    }

    .cart-indicator {
      background: #667eea;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-greeting {
      color: #333;
      font-weight: 500;
    }

    .btn-logout {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-logout:hover {
      background: #c0392b;
    }

    .auth-links {
      display: flex;
      gap: 1rem;
    }

    .main-content {
      flex: 1;
    }

    .app-footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 2rem;
      margin-top: auto;
    }
  `]
})
export class AppComponent {
  authService = inject(AuthService);
  carrinhoService = inject(CarrinhoService);
  router = inject(Router);

  quantidadeItens = 0;

  constructor() {
    // Escutar mudanças no carrinho
    this.carrinhoService.carrinho$.subscribe(() => {
      this.quantidadeItens = this.carrinhoService.obterQuantidadeTotal();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
